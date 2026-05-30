"use client";

import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            // Not logged in
            if (!user) {
                router.push("/auth/login");
            }
            // Logged in but wrong role
            else if (allowedRoles && !allowedRoles.includes(user.role)) {
                router.push("/unauthorized");
            }
        }
    }, [user, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return children;
};

export default ProtectedRoute;