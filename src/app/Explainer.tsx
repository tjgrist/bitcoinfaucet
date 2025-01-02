"use client";

import useSWR from "swr";

export default function Explainer() {
    const { data } = useSWR("/api/limits", (url) => fetch(url).then((res) => res.json()));
    
    return (
        <div className="container mx-auto rounded-lg mb-20">
            <h1 className="font-bold mb-2 text-7xl">Get Free tBTC!</h1>
            <p className="text-sm mb-2">Develop and test Bitcoin apps safely with testnet Bitcoin (tBTC).</p>
            <p className="text-sm mb-2">Send {data?.limit * 1e-8} tBTC to yourself today!</p>
        </div>
    )
}