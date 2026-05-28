import { useEffect, useState } from "react";
import fetchAPI from "@/lib/fetchAPI";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [apps, setApps] = useState([]);

    // Fetch business jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await fetchAPI("/jobs/my");
                setJobs(data);
            } catch (err) {
                alert(err.message);
            }
        }
        fetchJobs();
    }, [])

    // Fetch applicants when job selected
    useEffect(() => {
        if (!selectedJob) return;
        const fetchApps = async () => {
            try {
                const data = await fetchAPI(`/applications/job/${selectedJob._id}`);
                setApps(data.applications);
            } catch (err) {
                alert(err.message);
            }
        }
        fetchApps();
    }, [selectedJob])

    return (
        <div>
            <h1>Dashboard</h1>

            {/* Job Selection */}
            <h2>Your Jobs</h2>
            {jobs.map(job => (
                <button key={job._id} onClick={() => setSelectedJob(job._id)}>
                    {job.title}
                </button>
            ))}

            {/* Applicants */}
            {selectedJob && (
                <>
                    <h2>Applicants</h2>

                    {apps.map(app => (
                        <div key={app._id}>
                            <h3>{app.user.name}</h3>
                            <p>{app.type}</p>
                            <p>{app.proposal}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );

};