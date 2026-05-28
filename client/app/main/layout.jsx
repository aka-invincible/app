"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function MainLayout({ children }) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
}