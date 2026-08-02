import "./globals.css";
import type { Metadata } from "next";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "GUESS360",
  description: "AI Fashion Platform",
};

export default function RootLayout({
  children,
}: {
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