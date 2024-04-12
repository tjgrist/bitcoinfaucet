import paxosAxios from '@/lib/paxos';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {

    const { data } = await paxosAxios.get("/profiles");

    return NextResponse.json(data);
}