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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <section className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Your Jobs</h2>
                <div className="flex flex-col gap-3">
                    {jobs.map(job => (
                        <button key={job._id} onClick={() => setSelectedJob(job)} className="w-full rounded-2xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900/80">
                            {job.title}
                        </button>
                    ))}
                </div>
            </section>

            <section className="md:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">Applicants</h2>
                {!selectedJob && <p className="text-slate-600 dark:text-slate-300">Select a job to view applicants.</p>}

                {selectedJob && (
                    <>
                        <h3 className="mb-4 text-lg font-medium text-slate-800 dark:text-slate-200">{selectedJob.title}</h3>
                        <div className="flex flex-col gap-4">
                            {apps.length === 0 && <p className="text-slate-600 dark:text-slate-300">No applicants yet.</p>}
                            {apps.map(app => (
                                <div key={app._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/80">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-slate-100">{app.user?.name}</p>
                                            <p className="text-sm text-teal-700 dark:text-teal-300">{app.type}</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-slate-700 dark:text-slate-300">{app.proposal}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );

};