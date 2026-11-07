import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticatedUser } from "@medbridge/types";
import { authApi, setAuthToken } from "@medbridge/api";

interface AuthContextType {
  user: AuthenticatedUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  registerPatient: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  registerDoctor: (data: {
    name: string;
    email: string;
    phone: string;
    specialization: string;
    licenseNumber: string;
    hospitalAffiliation?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthenticatedUser | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => ({ success: false }),
  registerPatient: async () => ({ success: false }),
  registerDoctor: async () => ({ success: false }),
  logout: async () => {},
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    async function checkAuth() {
      try {
        const res = await authApi.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        }
      } catch (err) {
        // Not logged in or backend offline
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email: string, pass: string, role?: string) => {
    try {
      const res = await authApi.login({ email, password: pass, role });
      if (res.success && res.user) {
        setUser(res.user);
        if (res.token) {
          setTokenState(res.token);
          setAuthToken(res.token);
        }
        return { success: true };
      }
      return { success: false, error: res.error || "Login failed" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      return { success: false, error: msg };
    }
  };

  const registerPatient = async (data: { name: string; email: string; phone: string; password: string }) => {
    try {
      const res = await authApi.registerPatient(data);
      if (res.success && res.user) {
        setUser(res.user);
        if (res.token) {
          setTokenState(res.token);
          setAuthToken(res.token);
        }
        return { success: true };
      }
      return { success: false, error: res.error || "Registration failed" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      return { success: false, error: msg };
    }
  };

  const registerDoctor = async (data: {
    name: string;
    email: string;
    phone: string;
    specialization: string;
    licenseNumber: string;
    hospitalAffiliation?: string;
    password: string;
  }) => {
    try {
      const res = await authApi.registerDoctor(data);
      if (res.success && res.user) {
        setUser(res.user);
        if (res.token) {
          setTokenState(res.token);
          setAuthToken(res.token);
        }
        return { success: true };
      }
      return { success: false, error: res.error || "Registration failed" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      setTokenState(null);
      setAuthToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        registerPatient,
        registerDoctor,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
