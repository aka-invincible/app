"use client"

import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { user } = useAuth() || {};

  return (
    <header className="w-full border-b border-slate-200 bg-white/85 backdrop-blur-xl shadow-sm dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-300">Ad-Tack</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          <Link href="/user" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Profile
          </Link>
          <Link href="/user/jobs" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Jobs
          </Link>
          <Link href="/business/dashboard" className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Dashboard
          </Link>
          {!user ? (
            <>
              <Link href="/auth/login">
                <Button className="text-sm" variant="primary">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="text-sm" variant="ghost">Register</Button>
              </Link>
            </>
          ) : (
            <span className="text-sm text-slate-600 dark:text-slate-300">Hello, {user.name || user.email}</span>
          )}
        </nav>
      </div>
    </header>
  );
}
