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
import { Separator } from "@/components/ui/separator";

export default function WalletInfo() {
    const { data } = useSWR("/api/transactions", (url) => fetch(url).then((res) => res.json()));
    const { data: config } = useSWR("/api/limits", (url) => fetch(url).then((res) => res.json()));
    const tBTCAddress= "2NDkCKa2hWK15q2nPx8hegadgWP9nePk4Tt";
    const BTCAddress= "bc1q2puzleq9yeqr7mth3ttztn0r9g6njhlaxurh0k";

    return (
        <Tabs defaultValue="wallet" className="flex-grow text-center">
            <TabsList>
                <TabsTrigger value="wallet">Faucet</TabsTrigger>
                <TabsTrigger value="replenish">Replenish</TabsTrigger>
                <TabsTrigger value="donate">Donate</TabsTrigger>
            </TabsList>
            <TabsContent value="wallet">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Balance</CardTitle>
                        <CardDescription className="text-center">
                        <Balance />
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col text-center items-center">
                        <div className="space-y-2">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium leading-none">Total Transactions</h4>
                                <div className="text-sm text-muted-foreground inline-flex">
                                    {data?.length}
                                </div>
                                <Separator />
                                <h4 className="text-sm font-medium leading-none">Transaction Amount Limit</h4>
                                <div className="text-sm text-muted-foreground inline-flex">
                                    <Bitcoin size={18}/> {config?.limit}
                                </div>
                                <Separator />
                                <h4 className="text-sm font-medium leading-none">Daily Transaction Limit</h4>
                                <div className="text-sm text-muted-foreground inline-flex">
                                    {config?.dailyTransactionLimit}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="replenish">
                <Card>
                    <CardHeader>
                        <CardTitle>Done with your bitcoin?</CardTitle>
                        <CardDescription>
                            Send it back to the faucet so others can use it.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BitcoinAddressCard address={tBTCAddress}/>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="donate">
                <Card>
                    <CardHeader>
                        <CardTitle>Found this useful?</CardTitle>
                        <CardDescription>
                            Buy me a coffee!
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BitcoinAddressCard address={BTCAddress}/>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}