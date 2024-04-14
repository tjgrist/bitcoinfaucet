"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Balance from "./Balance"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useSWR from "swr";
import { Bitcoin } from "lucide-react";
import BitcoinAddressCard from "./BitcoinAddressCard";

export default function WalletInfo() {
    const { data } = useSWR("/api/transactions", (url) => fetch(url).then((res) => res.json()));
    const { data: config } = useSWR("/api/limits", (url) => fetch(url).then((res) => res.json()));

    return (
        <Tabs defaultValue="wallet" className="flex-1">
            <TabsList>
                <TabsTrigger value="wallet">Faucet</TabsTrigger>
                <TabsTrigger value="replenish">Replenish</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet">
                <Card>
                    <CardHeader>
                        <CardTitle>Wallet Balance</CardTitle>
                        <CardDescription>
                            <Balance />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 flex-row">
                            <h4 className="text-sm font-medium leading-none">Transactions</h4>
                            {data && config &&
                                <p className="flex text-sm text-muted-foreground">
                                    Total: {data?.length} | Daily Limit: {config?.dailyTransactionLimit} | Send Limit: <Bitcoin size={12} />{config?.limit}
                                </p>}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="replenish">
                <Card>
                    <CardHeader>
                        <CardTitle>Done with your bitcoins?</CardTitle>
                        <CardDescription>
                            Send it back to the faucet so others can use it.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BitcoinAddressCard />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}