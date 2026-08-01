import "./globals.css";
import type { Metadata } from "next";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "GUESS360",
  description: "Fashion Platform",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
