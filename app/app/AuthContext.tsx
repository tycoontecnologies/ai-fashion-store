"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  user: any;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: false,
    logout: async () => {},
  });

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
