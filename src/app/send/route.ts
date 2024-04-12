


import { NextRequest, NextResponse } from 'next/server';
import faucetLimit from '@/lib/faucetLimit';
import { Network, validate } from 'bitcoin-address-validation';
import { addTransactionToFirebaseFaucet } from '../../lib/addTransactionToFirebaseFaucet';
import { withdrawToAddress } from '../../lib/withdrawToAddress';
import { sendEmail } from '@/lib/resend';

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();

    if (!address) return NextResponse.json({ error: 'No address found.' });

    if (!validate(address, 'testnet' as Network)) return NextResponse.json({ error: 'Invalid address' });

    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.json({ error: 'No IP found.' });

    const limit = await faucetLimit();

    try {
        await withdrawToAddress(limit, address, ip);
    }
    catch (error) {
        console.error('Error creating withdrawal', error);
        return NextResponse.json({ error });
    }

    // add the ip to the firestore database collection 'ips'
    await addTransactionToFirebaseFaucet(ip, limit, address);

    try {
        const responseToMe = await sendEmail(ip);

        return NextResponse.json(responseToMe);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
