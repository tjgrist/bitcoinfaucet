import { NextRequest, NextResponse } from 'next/server';
import faucetConfig from '@/lib/faucetLimit';
import { Network, validate } from 'bitcoin-address-validation';
import { addTransactionToFirebaseFaucet as addTransactionToFaucet } from '../../../lib/addTransactionToFirebaseFaucet';
import { withdrawToAddress } from '../../../lib/bitgoWithdraw';
import { sendEmail } from '@/lib/resend';
import { checkTransactionLimits } from '@/lib/checkTransactionLimits';

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();

    if (!address) return NextResponse.json('No tBTC wallet address provided.', { status: 400 });

    if (!validate(address, 'testnet' as Network)) return NextResponse.json('Invalid tBTC wallet address.', { status: 400 });

    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.json('Could not determine IP.', { status: 400 });

    const config = await faucetConfig();

    try {
        await checkTransactionLimits(ip, address, config.dailyTransactionLimit);
    }
    catch (error: any) {
        return NextResponse.json(error?.message, { status: 429});
    }
    
    try {
        const data = await withdrawToAddress(config.limit, address, ip);
        await addTransactionToFaucet(ip, config.limit, address, data.txid);
    }
    catch (error: any) {
        return NextResponse.json(`Could not send tBTC. ${error?.message}`, { status: 500});
    }

    try {
        await sendEmail(ip, address, config.limit);

        return NextResponse.json(null, { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong.", { status: 500 });
    }
}
