import { NextRequest, NextResponse } from 'next/server';
import faucetLimit from '@/lib/faucetLimit';
import { Network, validate } from 'bitcoin-address-validation';
import { addTransactionToFirebaseFaucet as addTransactionToFaucet } from '../../../lib/addTransactionToFirebaseFaucet';
import { withdrawToAddress } from '../../../lib/bitgoWithdraw';
import { sendEmail } from '@/lib/resend';
import { getLatestTransactionByIp } from '@/lib/getLatestTransactionByIp';

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();

    if (!address) return NextResponse.error();

    if (!validate(address, 'testnet' as Network)) return NextResponse.error();

    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.error();

    const limit = await faucetLimit();

    try {
        await getLatestTransactionByIp(ip);
    }
    catch (error) {
        return NextResponse.error();
    }
    
    try {
        const data = await withdrawToAddress(limit, address, ip);
        await addTransactionToFaucet(ip, limit, address, data.txid);
    }
    catch (error) {
        console.error('Error creating withdrawal', error);
        return NextResponse.error();
    }

    try {
        const responseToMe = await sendEmail(ip, address, limit);

        return NextResponse.json(responseToMe);
    } catch (error) {
        return NextResponse.error();
    }
}
