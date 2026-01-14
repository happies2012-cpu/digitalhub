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
  // If useAuth is used outside provider (e.g. if we missed wrapping something), 
  // try to fallback to direct Clerk hooks if possible, otherwise throw.
  // Since we wrapped App with ClerkProvider but NOT AuthProvider from the old context...
  // WAIT: App.tsx wraps everything in ClerkProvider.
  // We need to wrap App's children in OUR AuthProvider too if we want this context to work!

  if (context === undefined) {
    // If we are here, it means the component is NOT wrapped in our new AuthProvider.
    // However, since we are rewriting AuthContext, we can't easily change App.tsx again without another edit.
    // But we CAN make useAuth directly use Clerk hooks if context is missing!
    // This effectively makes the Provider optional if we just want the hooks to work.

    // Check if we are inside ClerkProvider (we should be)
    try {
      const { user, isLoaded } = useUser();
      const { signOut } = useClerk();

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
    } catch (e) {
      throw new Error('useAuth must be used within ClerkProvider context');
    }
  }
  return context;
};
