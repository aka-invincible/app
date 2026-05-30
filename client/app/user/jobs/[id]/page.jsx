"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import fetchAPI from "@/lib/fetchAPI"

export default function JobDetail() {
    const { id } = useParams();
    const [type, setType] = useState("creator");

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
        <div>
            <h1>Apply to Job</h1>

            <select onChange={(e) => setType(e.target.value)}>
                <option value="creator">Creator</option>
                <option value="influencer">Influencer</option>
            </select>

            <button onClick={apply}>Apply</button>
        </div>
    );
}