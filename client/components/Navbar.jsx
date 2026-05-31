"use client"

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth() || {};

  return (
    <header className="w-full bg-white shadow-sm dark:bg-gray-800">
      <div className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-bold">Ad-Tack</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/user" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-200">
            Profile
          </Link>
          <Link href="/user/jobs" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-200">
            Jobs
          </Link>
          <Link href="/business/dashboard" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-200">
            Dashboard
          </Link>
          {!user ? (
            <>
              <Link href="/auth/login" className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm text-indigo-600 hover:underline">
                Register
              </Link>
            </>
          ) : (
            <span className="text-sm text-gray-600 dark:text-gray-300">Hello, {user.name || user.email}</span>
          )}
        </nav>
      </div>
    </header>
  );
}
