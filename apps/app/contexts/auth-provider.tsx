import { supabase } from "~/lib/supabase";
import { Session, AuthError } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthState {
  session: Session | null;
  isLoading: boolean;
  hasError: AuthError | null;
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean;
  userId?: string;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    isLoading: true,
    hasError: null,
  });

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        setAuthState((state) => ({
          ...state,
          session,
          isLoading: false,
        }));
      } catch (error) {
        setAuthState((state) => ({
          ...state,
          hasError: error as AuthError,
          isLoading: false,
        }));
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthState((state) => ({
        ...state,
        session,
        hasError: null,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setAuthState((state) => ({
        ...state,
        hasError: error as AuthError,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        userId: authState.session?.user.id,
        isAuthenticated: !!authState.session,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
