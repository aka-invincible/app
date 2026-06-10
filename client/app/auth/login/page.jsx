"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/fetchAPI";
import useAuth from "@/hooks/useAuth";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const user = await fetchAPI("/auth/login", {
                method: "POST",
                body: JSON.stringify(form)
            });

            setUser(user);

            if (user?.role === "business") {
                router.push("/business/dashboard");
            } else {
                router.push("/user/jobs");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[1.75rem] border border-slate-200 bg-white/95 p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                <h2 className="mb-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">Sign in to your account</h2>

                <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">Email</label>
                <input
                    className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <label className="mb-2 block text-sm text-slate-600 dark:text-slate-300">Password</label>
                <input
                    className="mb-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button type="submit" className="w-full rounded-full bg-teal-600 px-4 py-3 text-white shadow-lg transition hover:bg-teal-700">Sign in</button>
            </form>
        </div>
    );
}