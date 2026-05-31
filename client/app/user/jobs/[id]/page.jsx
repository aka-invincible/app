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
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{job?.title || 'Loading...'}</h1>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{job?.description}</p>

                <div className="mt-6 flex items-center gap-4">
                    <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-gray-200 px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                        <option value="creator">Creator</option>
                        <option value="influencer">Influencer</option>
                    </select>

                    <button onClick={apply} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Apply</button>
                </div>
            </div>
        </div>
    );
}