/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx,mdx}',
        './components/**/*.{js,jsx,ts,tsx,mdx}',
        './context/**/*.{js,jsx,ts,tsx,mdx}',
        './hooks/**/*.{js,jsx,ts,tsx,mdx}',
        './pages/**/*.{js,jsx,ts,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
};
