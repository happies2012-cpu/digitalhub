# 🚀 Quick Start Guide - Backend Systems

## ✅ What's Ready

All backend systems are implemented and ready to use:

- ✅ Authentication & RBAC
- ✅ Usage Logging
- ✅ Analytics Tracking
- ✅ Payment Integration (PayU & Cashfree)
- ✅ Admin Route Protection
- ✅ Database Schema with RLS

## 📋 Immediate Next Steps

### 1. Deploy Database Migration (REQUIRED)

```bash
# Option A: Using Supabase CLI (recommended)
npx supabase db push

# Option B: Manual via Supabase Dashboard
# 1. Go to https://supabase.com/dashboard
# 2. Select your project
# 3. Go to SQL Editor
# 4. Copy content from: supabase/migrations/20260114175653_add_usage_and_analytics.sql
# 5. Paste and run
```

### 2. Create Your First Admin User

After deploying the migration, run this SQL in Supabase SQL Editor:

```sql
-- Replace 'your-user-id' with your actual user ID from auth.users table
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

To find your user ID:
```sql
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
```

### 3. Configure Payment Gateways (Optional)

Edit `.env` file and add your credentials:

```bash
# PayU (https://payu.in/)
VITE_PAYU_KEY="your_merchant_key"
VITE_PAYU_SALT="your_salt"
VITE_PAYU_ENV="test"  # Change to "production" when ready

# Cashfree (https://www.cashfree.com/)
VITE_CASHFREE_APP_ID="your_app_id"
VITE_CASHFREE_SECRET="your_secret_key"
VITE_CASHFREE_ENV="test"  # Change to "production" when ready
```

### 4. Verify Setup

```bash
# Check environment variables
./scripts/check-env.sh

# Start development server
npm run dev

# Test the following:
# 1. Sign up a new user
# 2. Login with your admin account
# 3. Navigate to /admin (should work for admin, blocked for others)
# 4. Check Supabase tables for data
```

## 🎯 Quick Usage Examples

### Track User Actions

```typescript
import { logUsage } from '@/lib/usage/logger';

// In any component or page
await logUsage({
  action: 'report_generated',
  resource: 'analytics',
  metadata: { report_type: 'monthly', format: 'pdf' }
});
```

### Track Analytics Events

```typescript
import { trackEvent } from '@/lib/analytics/queries';

await trackEvent({
  event_type: 'engagement',
  event_name: 'feature_used',
  properties: { feature: 'seo_optimizer', duration: 120 }
});
```

### Check User Roles

```typescript
import { useRole } from '@/hooks/useRole';

function MyComponent() {
  const { isAdmin, isAgency, hasRole } = useRole();
  
  return (
    <div>
      {isAdmin && <AdminPanel />}
      {isAgency && <AgencyFeatures />}
      {hasRole('user') && <UserDashboard />}
    </div>
  );
}
```

### Check Subscription Status

```typescript
import { useSubscription } from '@/hooks/useSubscription';

function PremiumFeature() {
  const { hasActiveSubscription, planName } = useSubscription();
  
  if (!hasActiveSubscription) {
    return <UpgradePrompt />;
  }
  
  return <PremiumContent plan={planName} />;
}
```

### Initiate Payment

```typescript
import { initiatePayUPayment } from '@/lib/payments/payu';

async function handlePayment() {
  const payment = await initiatePayUPayment({
    amount: 999,
    productInfo: 'Pro Plan - Monthly',
    firstName: user.name,
    email: user.email,
    phone: user.phone,
    planName: 'pro'
  });
  
  // Create form and submit to payment gateway
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = payment.url;
  
  Object.entries(payment.params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  
  document.body.appendChild(form);
  form.submit();
}
```

## 📁 File Structure

```
src/
├── lib/
│   ├── auth/
│   │   ├── requireAuth.ts      # Authentication utilities
│   │   ├── requireAdmin.ts     # RBAC utilities
│   │   └── index.ts
│   ├── usage/
│   │   ├── logger.ts           # Usage logging
│   │   └── index.ts
│   ├── analytics/
│   │   ├── queries.ts          # Analytics tracking
│   │   └── index.ts
│   └── payments/
│       ├── payu.ts             # PayU integration
│       ├── cashfree.ts         # Cashfree integration
│       └── index.ts
├── hooks/
│   ├── useRole.ts              # Role checking hook
│   ├── useSubscription.ts      # Subscription hook
│   └── useUsageTracking.ts     # Usage tracking hook
└── components/
    └── auth/
        ├── ProtectedRoute.tsx  # Auth protection
        └── AdminRoute.tsx      # Admin protection

supabase/
└── migrations/
    └── 20260114175653_add_usage_and_analytics.sql

scripts/
└── check-env.sh                # Environment validation
```

## 🔍 Troubleshooting

### Admin Route Shows "Access Denied"

1. Check if user has admin role:
   ```sql
   SELECT * FROM user_roles WHERE user_id = 'your-user-id';
   ```

2. If no role found, add it:
   ```sql
   INSERT INTO user_roles (user_id, role) VALUES ('your-user-id', 'admin');
   ```

### Payment Integration Not Working

1. Verify environment variables:
   ```bash
   ./scripts/check-env.sh
   ```

2. Check payment gateway credentials in dashboard
3. Ensure you're using test mode for development

### Usage Logs Not Appearing

1. Check if user is authenticated
2. Verify RLS policies in Supabase
3. Check browser console for errors

## 📚 Full Documentation

- **Detailed Guide**: `BACKEND_SYSTEMS.md`
- **Implementation Walkthrough**: See artifacts
- **Environment Template**: `.env.example`

## 🎉 You're All Set!

The backend systems are production-ready. Just deploy the migration, create an admin user, and optionally configure payment gateways.

**Questions?** Check `BACKEND_SYSTEMS.md` for detailed documentation.
