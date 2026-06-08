"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchAPI } from "@/lib/fetchAPI"

export default function JobDetail() {
    const { id } = useParams();
    const [type, setType] = useState("creator");
    const [job, setJob] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchAPI(`/jobs/${id}`);
                setJob(data.job || data);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, [id]);

    const apply = async () => {
        try {
            await fetchAPI('/applications', {
                method: 'POST',
                body: JSON.stringify({ jobId: id, type }),
            });
            alert("Applied successfully!");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="mx-auto max-w-3xl">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{job?.title || 'Loading...'}</h1>
                <p className="mt-4 text-slate-700 dark:text-slate-300">{job?.description}</p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                        <option value="creator">Creator</option>
                        <option value="influencer">Influencer</option>
                    </select>

                    <button onClick={apply} className="rounded-full bg-teal-600 px-5 py-3 text-white shadow-lg transition hover:bg-teal-700">Apply</button>
                </div>
            </div>
        </div>
    );
}