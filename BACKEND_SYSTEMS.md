# Backend Systems Documentation

## Overview
This document describes the backend systems implemented for the DigitalAds platform.

## Systems Implemented

### 1. Authentication & RBAC
- **Location**: `src/lib/auth/`
- **Features**:
  - `requireAuth()` - Require user authentication
  - `requireAdmin()` - Require admin role
  - `hasRole()` - Check user roles
  - `getUserRoles()` - Get all user roles

### 2. Usage Logging
- **Location**: `src/lib/usage/`
- **Features**:
  - Track user actions
  - Log resource access
  - Store metadata with logs
  - Query usage history

### 3. Analytics
- **Location**: `src/lib/analytics/`
- **Features**:
  - Track custom events
  - Platform-wide analytics (admin only)
  - User statistics
  - Event aggregation

### 4. Payment Integration
- **Location**: `src/lib/payments/`
- **Providers**:
  - **PayU**: Indian payment gateway
  - **Cashfree**: Alternative Indian payment gateway
- **Features**:
  - Payment initiation
  - Transaction tracking
  - Subscription management

### 5. React Hooks
- **Location**: `src/hooks/`
- **Hooks**:
  - `useRole()` - Access user roles
  - `useSubscription()` - Access subscription data
  - `useUsageTracking()` - Track usage and analytics

### 6. Route Protection
- **Components**:
  - `ProtectedRoute` - Require authentication
  - `AdminRoute` - Require admin role

## Database Schema

### Tables
1. **profiles** - User profile information
2. **user_roles** - User role assignments
3. **subscriptions** - Subscription records
4. **usage_logs** - User activity logs
5. **analytics_events** - Analytics events

### Functions
- `has_role()` - Check user role
- `get_user_stats()` - Get user statistics
- `get_platform_analytics()` - Get platform analytics (admin only)

## Environment Variables

### Required
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Optional (Payment Gateways)
- `VITE_PAYU_KEY`
- `VITE_PAYU_SALT`
- `VITE_PAYU_ENV`
- `VITE_CASHFREE_APP_ID`
- `VITE_CASHFREE_SECRET`
- `VITE_CASHFREE_ENV`

## Usage Examples

### Track User Action
```typescript
import { logUsage } from '@/lib/usage/logger';

await logUsage({
  action: 'campaign_created',
  resource: 'campaigns',
  metadata: { campaign_id: '123' }
});
```

### Check Admin Access
```typescript
import { useRole } from '@/hooks/useRole';

function AdminPanel() {
  const { isAdmin, loading } = useRole();
  
  if (!isAdmin) return <div>Access Denied</div>;
  return <div>Admin Content</div>;
}
```

### Initiate Payment
```typescript
import { initiatePayUPayment } from '@/lib/payments/payu';

const payment = await initiatePayUPayment({
  amount: 999,
  productInfo: 'Pro Plan Subscription',
  firstName: 'John',
  email: 'john@example.com',
  phone: '9876543210',
  planName: 'pro'
});
```

## Next Steps

1. **Run Database Migration**:
   ```bash
   # Push migration to Supabase
   npx supabase db push
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Validate Environment**:
   ```bash
   ./scripts/check-env.sh
   ```

4. **Test Systems**:
   - Test authentication flows
   - Verify role-based access
   - Test payment integration (sandbox mode)
   - Check usage logging
   - Verify analytics tracking

## Security Notes

- All database tables have Row Level Security (RLS) enabled
- Admin functions use SECURITY DEFINER with proper authorization checks
- Payment credentials should never be committed to version control
- Use environment variables for all sensitive configuration

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- PayU Documentation: https://devguide.payu.in/
- Cashfree Documentation: https://docs.cashfree.com/
