import { getBalance } from "@/lib/balance";
import faucetConfig from "@/lib/faucetLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const faucet = await faucetConfig();
    const balance = await getBalance();
    return NextResponse.json({
        limit: balance * .01,
        dailyTransactionLimit: faucet.dailyTransactionLimit,
    });
}