"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from "react";

type AuthContextType = {
  user: any;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  logout: async () => {},
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<any>(null);

  async function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: false,
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
