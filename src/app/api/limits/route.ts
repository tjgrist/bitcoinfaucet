import faucetConfig from "@/lib/faucetLimit";
import { getTransactionLimit } from "@/lib/transactionLimit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const faucet = await faucetConfig();
    return NextResponse.json({
        limit: await getTransactionLimit(),
        dailyTransactionLimit: faucet.dailyTransactionLimit,
    });
}