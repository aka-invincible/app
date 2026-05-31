import { cookies } from 'next/headers'

export default async function JobsPage() {
    const cookieStore = cookies();
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
            <h1 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">Jobs</h1>

            <div className="grid gap-4">
                {jobs.map(job => (
                    <a key={job._id} href={`/user/jobs/${job._id}`} className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{job.title}</h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{job.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}