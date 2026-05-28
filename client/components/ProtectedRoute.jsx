"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading]);



    if (loading) {
        return <p>Loading...</p>;
    }

    return children;
}