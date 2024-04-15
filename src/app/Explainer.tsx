"use client";

import useSWR from "swr";

export default function Explainer() {
    const { data } = useSWR("/api/limits", (url) => fetch(url).then((res) => res.json()));
    
    return (
        <div className="container mx-auto rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-2">Get Free Testnet Bitcoin</h2>
            <p className="mb-2">Develop and test Bitcoin apps safely with testnet Bitcoin (tBTC).</p>
            <p className="mb-2">Send {data?.limit} tBTC to yourself today!</p>
        </div>
    )
}