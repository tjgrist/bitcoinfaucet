"use client";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator"
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { Skeleton } from "@/components/ui/skeleton";

export default function Transactions() {
    const { data: balance, error: balError } = useSWR("/api/balance", (url) => fetch(url).then((res) => res.json()));
    const { data, error } = useSWR("/api/transactions", (url) => fetch(url).then((res) => res.json()));

    if (error) return <div>Error loading transactions.</div>;
    if (!data) return <Loading />;


    return (
        <div className="mx-auto py-10">
            <DataTable columns={columns} data={data.slice(0, 5)} />
        </div>
    );
}

function Loading() {
    return (
        <div className="mx-auto py-10">
            <Skeleton className="py-10 w-full h-[40px] rounded-full mb-2" />
            <Skeleton className="py-10 w-full h-[40px] rounded-full mb-2" />
            <Skeleton className="py-10 w-full h-[40px] rounded-full mb-2" />
            <Skeleton className="py-10 w-full h-[40px] rounded-full mb-2" />
            <Skeleton className="py-10 w-full h-[40px] rounded-full mb-2" />
        </div>
    );

}


function Tx({
    id,
    tbtc,
    ip,
    timestamp,
    txId,
}: {
    id: string;
    tbtc: string;
    ip: string;
    timestamp: string;
    txId: string;
}) {
    return (
        <div>
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">{id}</h4>
                <p className="text-sm text-muted-foreground">
                    TBTC: {tbtc} | IP: {ip} | {timestamp}
                </p>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm">
                <a href={`https://blockstream.info/testnet/tx/${txId}`} target="_blank" rel="noreferrer">View on Blockstream.info</a>
            </div>
            <Separator className="my-4" />
        </div>
    )
}