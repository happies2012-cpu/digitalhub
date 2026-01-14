import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';

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
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder';

function App() {
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
