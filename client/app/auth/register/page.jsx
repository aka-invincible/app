"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/fetchAPI";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role="creator"
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await fetchAPI("/auth.register", {
                method: "POST",
                body: JSON.stringify(form)
            });

            router.push("/auth/login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

            <select onChange={e => setForm({ ...form, role: e.target.value })}>
                <option value="creator">Creator</option>
                <option value="influencer">Influencer</option>
                <option value="business">Business</option>
            </select>

            <button type="submit">Register</button>
        </form>
    );
}

