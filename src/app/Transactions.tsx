"use client";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator"

export default function Transactions() {
    const { data, error } = useSWR("/api/transactions", (url) => fetch(url).then((res) => res.json()));

    if (error) return <div>Error loading transactions.</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Separator className="my-4" />
            {data.map((tx: any) => (
                <Tx key={tx.id} {...tx} />
            ))}
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