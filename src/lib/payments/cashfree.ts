import { supabase } from '@/integrations/supabase/client';

export interface CashfreeConfig {
  appId: string;
  secretKey: string;
  environment: 'test' | 'production';
}

export interface CashfreePaymentRequest {
  amount: number;
  planName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

/**
 * Initiate Cashfree payment
 */
export async function initiateCashfreePayment(request: CashfreePaymentRequest) {
  const config: CashfreeConfig = {
    appId: import.meta.env.VITE_CASHFREE_APP_ID || '',
    secretKey: import.meta.env.VITE_CASHFREE_SECRET || '',
    environment: import.meta.env.VITE_CASHFREE_ENV === 'production' ? 'production' : 'test',
  };

  if (!config.appId || !config.secretKey) {
    throw new Error('Cashfree configuration missing');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Generate unique order ID
  const orderId = `ORDER${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

  // Create subscription record
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      plan_name: request.planName,
      plan_price: request.amount,
      currency: 'INR',
      payment_provider: 'cashfree',
      transaction_id: orderId,
      status: 'pending',
    })
    .select()
    .single();

  if (subError) {
    throw subError;
  }

  const apiUrl = config.environment === 'production'
    ? 'https://api.cashfree.com/pg/orders'
    : 'https://sandbox.cashfree.com/pg/orders';

  // Create order via Cashfree API
  const orderData = {
    order_id: orderId,
    order_amount: request.amount,
    order_currency: 'INR',
    customer_details: {
      customer_id: user.id,
      customer_name: request.customerName,
      customer_email: request.customerEmail,
      customer_phone: request.customerPhone,
    },
    order_meta: {
      return_url: `${window.location.origin}/payment/success?order_id={order_id}`,
      notify_url: `${window.location.origin}/api/payment/webhook/cashfree`,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': config.appId,
        'x-client-secret': config.secretKey,
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Cashfree order');
    }

    const data = await response.json();

    return {
      orderId,
      paymentSessionId: data.payment_session_id,
      subscriptionId: subscription.id,
    };
  } catch (error) {
    console.error('Cashfree payment error:', error);
    throw error;
  }
}
