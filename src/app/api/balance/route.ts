import { getBalance } from "@/lib/balance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const balance = await getBalance();
    return NextResponse.json(balance);
}
