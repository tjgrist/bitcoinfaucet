"use client";

import { Bitcoin } from "lucide-react";
import useSWR from "swr";

export default function Balance() {
    const { data: balance, error, isLoading } = useSWR("/api/balance", (url) => fetch(url).then((res) => res.json()));

    if (error) return <div>Error loading balance.</div>;
    if (isLoading) return null;

    return (
        <div className="space-y-2 text-center">
            <div className="text-sm text-muted-foreground text-center justify-between">
                {balance}
            </div>
        </div>
    )
}