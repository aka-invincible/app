const BASE_URL = "http://localhost:5000/api";

export const fetchAPI = async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include", // important for cookies
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data;
}