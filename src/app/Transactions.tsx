"use client";
import useSWR from "swr";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Filter } from "lucide-react";

export default function Transactions() {
    const [filter, setFilter] = useState("all");
    const { data, error } = useSWR(`/api/transactions?filter=${filter}`, (url) => fetch(url).then((res) => res.json()));

    if (error) return <div>Error loading transactions.</div>;

    return (
        <div className="mx-auto py-5">
            <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold py-2">Recent Transactions</h3>
                <Button className="mt-1" variant="link" onClick={() => setFilter(filter === "mine" ? "all" : "mine")}><Filter size={16} />&nbsp;Filter by {filter === "mine" ? "all IPs" : "my IP"}</Button>
            </div>
            {!data ? <Loading /> : <DataTable columns={columns} data={data.slice(0, 15)} />}
        </div>
    );
}

function Loading() {
    const elements = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div className="mx-auto py-10">
            {elements.map((i) => <Skeleton key={i} className="py-6 w-full h-[20px] rounded-full mb-2" />)}
        </div>
    );
}