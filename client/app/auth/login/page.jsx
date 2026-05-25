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

            router.push("/dashboard");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}