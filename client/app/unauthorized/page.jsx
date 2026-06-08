import Link from 'next/link'

export default function Unauthorized() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-10 text-center shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">403 — Unauthorized</h1>
                <p className="mb-6 text-slate-600 dark:text-slate-300">You do not have permission to view this page.</p>
                <Link href="/" className="inline-flex rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700">Go home</Link>
            </div>
        </div>
    );
}