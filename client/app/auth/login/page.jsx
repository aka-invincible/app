"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/fetchAPI";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            await fetchAPI("/auth/login", {
                method: "POST",
                body: JSON.stringify(form)
            });

            router.push("/main/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">Sign in to your account</h2>

                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">Email</label>
                <input
                    className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">Password</label>
                <input
                    className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button type="submit" className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Sign in</button>
            </form>
        </div>
    );
}