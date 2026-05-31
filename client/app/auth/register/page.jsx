"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/fetchAPI";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "creator"
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await fetchAPI("/auth/register", {
                method: "POST",
                body: JSON.stringify(form)
            });

            router.push("/auth/login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">Create an account</h2>

                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">Name</label>
                <input
                    className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

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

                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">Role</label>
                <select
                    className="mb-6 w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                >
                    <option value="creator">Creator</option>
                    <option value="influencer">Influencer</option>
                    <option value="business">Business</option>
                </select>

                <button type="submit" className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Register</button>
            </form>
        </div>
    );
}

