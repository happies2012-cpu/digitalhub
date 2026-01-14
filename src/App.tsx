import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AlertCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Campaigns from '@/pages/Campaigns';
import Analytics from '@/pages/Analytics';
import SEO from '@/pages/SEO';
import SocialMedia from '@/pages/SocialMedia';
import EmailMarketing from '@/pages/EmailMarketing';
import Clients from '@/pages/Clients';
import Settings from '@/pages/Settings';
import Billing from '@/pages/Billing';
import Pricing from '@/pages/Pricing';
import Checkout from '@/pages/Checkout';
import PaymentSuccess from '@/pages/PaymentSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';

// Auth Components
import { ProtectedRoute, AdminRoute } from '@/components/auth';

const queryClient = new QueryClient();

// Get Clerk publishable key from environment
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Component to display when configuration is missing
const ConfigurationMissing = () => (
  <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="max-w-md w-full text-center space-y-6">
      <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Configuration Required</h1>
        <p className="text-muted-foreground">
          The application needs a valid Clerk Publishable Key to start.
        </p>
      </div>
      <div className="p-4 rounded-lg bg-muted text-left font-mono text-sm break-all">
        VITE_CLERK_PUBLISHABLE_KEY={CLERK_PUBLISHABLE_KEY || 'undefined'}
      </div>
      <Button
        variant="outline"
        onClick={() => window.location.reload()}
      >
        Reload Application
      </Button>
    </div>
  </div>
);

function App() {
  // Check if key is missing or is the placeholder
  if (!CLERK_PUBLISHABLE_KEY || CLERK_PUBLISHABLE_KEY.includes('placeholder')) {
    // If it's a placeholder, we shouldn't crash, but we can't use Clerk.
    // However, to allow the Landing Page to work (which is public), 
    // we could conditionally render ClerkProvider only for protected routes?
    // No, Supabase auth was replaced. We need Clerk for everything now.
    // So we MUST return the error screen to prompt the user to fix env vars.
    return <ConfigurationMissing />;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaigns"
                element={
                  <ProtectedRoute>
                    <Campaigns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seo"
                element={
                  <ProtectedRoute>
                    <SEO />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/social-media"
                element={
                  <ProtectedRoute>
                    <SocialMedia />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/email-marketing"
                element={
                  <ProtectedRoute>
                    <EmailMarketing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <Clients />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/billing"
                element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failure" element={<PaymentFailure />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />

              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
