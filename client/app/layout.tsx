import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
