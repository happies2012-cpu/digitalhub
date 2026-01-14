import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PayURequest {
  amount: number;
  productInfo: string;
  firstName: string;
  email: string;
  phone: string;
  planId: string;
  userId: string;
}

function generateHash(params: Record<string, string>, salt: string): string {
  const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${salt}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(hashString);
  return crypto.subtle.digest('SHA-512', data).then(hash => {
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }) as unknown as string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYU_KEY = Deno.env.get('PAYU_KEY');
    const PAYU_SALT = Deno.env.get('PAYU_SALT');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!PAYU_KEY || !PAYU_SALT) {
      return new Response(
        JSON.stringify({ 
          error: 'Payment gateway not configured',
          message: 'Please add PAYU_KEY and PAYU_SALT secrets'
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body: PayURequest = await req.json();
    const { amount, productInfo, firstName, email, phone, planId, userId } = body;

    const txnid = `TXN${Date.now()}${Math.random().toString(36).substring(7)}`;

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        plan_id: planId,
        amount: amount,
        currency: 'INR',
        payment_method: 'payu',
        transaction_id: txnid,
        status: 'pending'
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Payment record error:', paymentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const params = {
      key: PAYU_KEY,
      txnid: txnid,
      amount: amount.toString(),
      productinfo: productInfo,
      firstname: firstName,
      email: email,
      phone: phone,
      surl: `${req.headers.get('origin')}/payment/success`,
      furl: `${req.headers.get('origin')}/payment/failure`,
    };

    // Generate hash
    const hashString = `${params.key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|||||||||||${PAYU_SALT}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(hashString);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    return new Response(
      JSON.stringify({
        paymentId: payment.id,
        txnid: txnid,
        params: {
          ...params,
          hash: hash,
        },
        payuUrl: 'https://secure.payu.in/_payment'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('PayU error:', error);
    return new Response(
      JSON.stringify({ error: 'Payment initialization failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
