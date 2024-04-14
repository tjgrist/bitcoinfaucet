import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { data } = await axios.get(`${process.env.BITGO_EXPRESS_URL}/tbtc/wallet/${process.env.BITGO_WALLET_ID}`, {
        headers: {
            Authorization: `Bearer ${process.env.BITGO_ACCESS_TOKEN}`,
        },
    });
    const balance = data?.spendableBalance / 1e8 || 0;
    return NextResponse.json(balance);
}