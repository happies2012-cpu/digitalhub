import { supabase } from '@/integrations/supabase/client';

export interface PayUConfig {
  key: string;
  salt: string;
  environment: 'test' | 'production';
}

export interface PaymentRequest {
  amount: number;
  productInfo: string;
  firstName: string;
  email: string;
  phone: string;
  planName: string;
}

/**
 * Generate PayU payment hash
 */
async function generatePayUHash(params: {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  salt: string;
}): Promise<string> {
  const { key, txnid, amount, productinfo, firstname, email, salt } = params;
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  
  // Use Web Crypto API for SHA-512
  const encoder = new TextEncoder();
  const data = encoder.encode(hashString);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Initiate PayU payment
 */
export async function initiatePayUPayment(request: PaymentRequest) {
  const config: PayUConfig = {
    key: import.meta.env.VITE_PAYU_KEY || '',
    salt: import.meta.env.VITE_PAYU_SALT || '',
    environment: import.meta.env.VITE_PAYU_ENV === 'production' ? 'production' : 'test',
  };

  if (!config.key || !config.salt) {
    throw new Error('PayU configuration missing');
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Generate unique transaction ID
  const txnid = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

  // Create subscription record
  const { data: subscription, error: subError } = await supabase
    .from('subscriptions')
    .insert({
      user_id: user.id,
      plan_name: request.planName,
      plan_price: request.amount,
      currency: 'INR',
      payment_provider: 'payu',
      transaction_id: txnid,
      status: 'pending',
    })
    .select()
    .single();

  if (subError) {
    throw subError;
  }

  // Generate payment hash
  const hash = await generatePayUHash({
    key: config.key,
    txnid,
    amount: request.amount.toString(),
    productinfo: request.productInfo,
    firstname: request.firstName,
    email: request.email,
    salt: config.salt,
  });

  const paymentUrl = config.environment === 'production'
    ? 'https://secure.payu.in/_payment'
    : 'https://test.payu.in/_payment';

  return {
    url: paymentUrl,
    params: {
      key: config.key,
      txnid,
      amount: request.amount,
      productinfo: request.productInfo,
      firstname: request.firstName,
      email: request.email,
      phone: request.phone,
      surl: `${window.location.origin}/payment/success`,
      furl: `${window.location.origin}/payment/failure`,
      hash,
    },
    subscriptionId: subscription.id,
  };
}
