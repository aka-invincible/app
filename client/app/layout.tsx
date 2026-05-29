import type { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
