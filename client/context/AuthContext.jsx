"use client"

import { createContext, useState, useEffect } from "react";
import { fetchAPI } from "@/lib/fetchAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetchAPI("/auth/me");
                setUser(res);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}