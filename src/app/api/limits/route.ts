import faucetConfig from "@/lib/faucetLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const faucet = await faucetConfig();
    return NextResponse.json({
        limit: faucet.limit / 1e8,
        dailyTransactionLimit: faucet.dailyTransactionLimit,
    });
}