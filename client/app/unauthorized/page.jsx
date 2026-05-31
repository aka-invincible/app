export default function Unauthorized() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="rounded-lg bg-white p-10 text-center shadow-md dark:bg-gray-800">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">403 — Unauthorized</h1>
                <p className="mb-6 text-gray-600 dark:text-gray-300">You don't have permission to view this page.</p>
                <a href="/" className="inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Go home</a>
            </div>
        </div>
    );
}