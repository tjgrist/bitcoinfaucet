import { getTransactions } from "@/lib/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;
    const params = new URLSearchParams(req.url);
    const transactions = await getTransactions(params.has('mine') ? ip : undefined);
    return NextResponse.json(transactions);
}