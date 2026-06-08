"use client"

export default function Button({ children, className = "", variant = "primary", ...props }) {
    const base = "btn";
    const variantClass = variant === "primary" ? "btn-primary" : "btn-ghost";

    return (
        <button className={`${base} ${variantClass} ${className}`} {...props}>
            {children}
        </button>
    );
}
