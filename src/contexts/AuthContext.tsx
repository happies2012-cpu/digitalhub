import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface AuthContextType {
  user: any | null; // Using any to be compatible with legacy usage
  loading: boolean;
  signOut: () => Promise<void>;
  // Legacy methods kept for type compatibility but marked as optional/unused
  // These will now just log warnings if accessed
  session?: any;
  signUp?: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn?: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle?: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Adapt Clerk user object to look somewhat like the Supabase user object 
  // expected by the rest of the app (e.g. DashboardHeader)
  const adaptedUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress,
    user_metadata: {
      full_name: user.fullName,
      avatar_url: user.imageUrl,
    },
    // Add other fields as needed
  } : null;

  const value = {
    user: adaptedUser,
    loading: !isLoaded,
    signOut: async () => {
      await signOut();
    },
    // Legacy implementations that warn
    signUp: async () => { console.warn('Use Clerk SignUp component'); return { error: new Error('Use Clerk SignUp component') }; },
    signIn: async () => { console.warn('Use Clerk SignIn component'); return { error: new Error('Use Clerk SignIn component') }; },
    signInWithGoogle: async () => { console.warn('Use Clerk SignIn component'); return { error: new Error('Use Clerk SignIn component') }; },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // ALWAYS call hooks at the top level
  // We need to wrap these in a try/catch or handle the case where we are not in ClerkProvider
  // However, useUser and useClerk throw if not in ClerkProvider? No, they just return undefined context sometimes or throw.
  // Actually, standard practice is just to call them. If they fail, they fail. 
  // But we want to support the case where AuthProvider isn't wrapping but ClerkProvider IS.

  // We can't conditionally call hooks. So we must call them every time.
  // This assumes useAuth is called inside a ClerkProvider at minimum.
  const clerkUser = useUser();
  const clerk = useClerk();

  if (context === undefined) {
    // Fallback: If not inside <AuthProvider>, try to use the hook values directly
    // This requires being inside <ClerkProvider>, which we are (in App.tsx)

    // Safety check: if clerkUser or clerk failed (unlikely if in ClerkProvider)
    if (!clerkUser || !clerk) {
      throw new Error('useAuth must be used within ClerkProvider context');
    }

    const { user, isLoaded } = clerkUser;
    const { signOut } = clerk;

    return {
      user: user ? {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        user_metadata: {
          full_name: user.fullName,
          avatar_url: user.imageUrl,
        }
      } : null,
      loading: !isLoaded,
      signOut: async () => {
        await signOut();
      },
      signUp: async () => ({ error: new Error('Use Clerk components') }),
      signIn: async () => ({ error: new Error('Use Clerk components') }),
      signInWithGoogle: async () => ({ error: new Error('Use Clerk components') })
    };
  }

  return context;
};
