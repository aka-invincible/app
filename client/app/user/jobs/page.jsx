import { cookies } from 'next/headers'

export default async function JobsPage() {
    const cookieStore = await cookies();
    const cookieString = Array.from(cookieStore).map(([name, value]) => `${name}=${value}`).join('; ');

    const res = await fetch(`http://localhost:5000/api/jobs`, {
        headers: {
            'cookie': cookieString
        },
        cache: 'no-store'
    });
    const data = await res.json();
    const jobs = Array.isArray(data) ? data : data.jobs || [];
    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-3xl font-semibold text-slate-900 dark:text-slate-100">Jobs</h1>

            <div className="grid gap-4">
                {jobs.map(job => (
                    <a key={job._id} href={`/user/jobs/${job._id}`} className="block rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{job.title}</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">{job.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}