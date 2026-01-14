import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const PAYU_SALT = Deno.env.get('PAYU_SALT');
    const CASHFREE_SECRET = Deno.env.get('CASHFREE_SECRET');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const contentType = req.headers.get('content-type') || '';
    let body: Record<string, any>;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      // PayU webhook (form data)
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      // Cashfree webhook (JSON)
      body = await req.json();
    }

    console.log('Webhook received:', JSON.stringify(body));

    // Determine payment provider and process
    if (body.txnid && body.status) {
      // PayU webhook
      const { txnid, status, mihpayid } = body;
      
      const paymentStatus = status === 'success' ? 'completed' : 
                           status === 'failure' ? 'failed' : 'pending';

      const { data: payment, error } = await supabase
        .from('payments')
        .update({ 
          status: paymentStatus,
          provider_payment_id: mihpayid,
          updated_at: new Date().toISOString()
        })
        .eq('transaction_id', txnid)
        .select()
        .single();

      if (error) {
        console.error('PayU update error:', error);
        return new Response('Error', { status: 500 });
      }

      // If payment successful, update subscription
      if (paymentStatus === 'completed' && payment) {
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: payment.user_id,
            plan_id: payment.plan_id,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
      }

    } else if (body.data?.order?.order_id) {
      // Cashfree webhook
      const { order_id, order_status, cf_order_id } = body.data.order;
      
      const paymentStatus = order_status === 'PAID' ? 'completed' : 
                           order_status === 'EXPIRED' || order_status === 'CANCELLED' ? 'failed' : 'pending';

      const { data: payment, error } = await supabase
        .from('payments')
        .update({ 
          status: paymentStatus,
          provider_payment_id: cf_order_id,
          updated_at: new Date().toISOString()
        })
        .eq('transaction_id', order_id)
        .select()
        .single();

      if (error) {
        console.error('Cashfree update error:', error);
        return new Response('Error', { status: 500 });
      }

      // If payment successful, update subscription
      if (paymentStatus === 'completed' && payment) {
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: payment.user_id,
            plan_id: payment.plan_id,
            status: 'active',
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          });
      }
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Error', { status: 500, headers: corsHeaders });
  }
});
