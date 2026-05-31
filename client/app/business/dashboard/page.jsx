"use client"

import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/fetchAPI";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [apps, setApps] = useState([]);

    // Fetch business jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await fetchAPI("/jobs/my");
                setJobs(data.jobs || data);
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
                setApps(data.applications || data);
            } catch (err) {
                alert(err.message);
            }
        }
        fetchApps();
    }, [selectedJob])

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6">
            <div className="col-span-1 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Your Jobs</h2>
                <div className="flex flex-col gap-2">
                    {jobs.map(job => (
                        <button key={job._id} onClick={() => setSelectedJob(job)} className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                            {job.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="col-span-2 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Applicants</h2>
                {!selectedJob && <p className="text-gray-600 dark:text-gray-300">Select a job to view applicants.</p>}

                {selectedJob && (
                    <>
                        <h3 className="mb-4 text-md font-medium text-gray-800 dark:text-gray-200">{selectedJob.title}</h3>
                        <div className="flex flex-col gap-4">
                            {apps.length === 0 && <p className="text-gray-600 dark:text-gray-300">No applicants yet.</p>}
                            {apps.map(app => (
                                <div key={app._id} className="rounded-md border border-gray-100 p-4 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-gray-100">{app.user?.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{app.type}</p>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">{app.proposal}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};