const BASE_URL = "http://localhost:5000/api";

export const fetchAPI = async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        context: "include", // important for cookies,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const data = await res.json();

    if (!data.ok) {
        throw new Error(data.error || "An error occurred while fetching data.");
    }

    return data;
}