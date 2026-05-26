import { cookies } from '@next/headers'

export default async function JobsPage() {
    const cookieStore = cookies();

    const res = await fetch(`http://localhost:5000/api/jobs`, {
        headers: {
            'cookie': cookieStore.toString()
        },
        cache: 'no-store'
    });

    return (
        <div>
            <h1>Jobs</h1>

            {jobs.map(job => (
                <div key={job._id}>
                    <a href={`/jobs/${job._id}`}>
                        <h2>{job.title}</h2>
                    </a>
                    <p>{job.description}</p>
                </div>
            ))}
        </div>
    );
}