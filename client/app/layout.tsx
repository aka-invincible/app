import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 text-slate-900 antialiased dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
        <AuthProvider>
          <Navbar />
          <main className="container py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
