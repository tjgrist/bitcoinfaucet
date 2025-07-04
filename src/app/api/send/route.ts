import { NextRequest, NextResponse } from 'next/server';
import faucetConfig from '@/lib/faucetLimit';
import { Network, validate } from 'bitcoin-address-validation';
import { addTransactionToFirebaseFaucet as addTransactionToFaucet } from '../../../lib/addTransactionToFirebaseFaucet';
import { withdrawToAddress } from '../../../lib/bitgoWithdraw';
import { sendEmail, sendFailureEmail } from '@/lib/resend';
import { checkTransactionLimits } from '@/lib/checkTransactionLimits';
import { getTransactionLimit } from '@/lib/transactionLimit';

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();

    if (!address) {
        await sendFailureEmail('UNKNOWN', 'UNKNOWN', 0, 'No tBTC wallet address provided.');
        return NextResponse.json('No tBTC wallet address provided.', { status: 400 });
    }

    if (!validate(address, 'testnet' as Network)) {
        await sendFailureEmail('UNKNOWN', address, 0, 'Invalid tBTC wallet address.');
        return NextResponse.json('Invalid tBTC wallet address.', { status: 400 });
    }

    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) {
        await sendFailureEmail('UNKNOWN', address, 0, 'Could not determine IP.');
        return NextResponse.json('Could not determine IP.', { status: 400 });
    }

    return NextResponse.json('Faucet is empty.', { status: 503 });

    // const config = await faucetConfig();
    // const limit = await getTransactionLimit();

    // try {
    //     await checkTransactionLimits(ip, address, config.dailyTransactionLimit);
    // }
    // catch (error: any) {
    //     await sendFailureEmail(ip, address, limit, JSON.stringify(error));
    //     return NextResponse.json(error?.message, { status: 429});
    // }
    
    // try {
    //     const data = await withdrawToAddress(limit, address, ip);
    //     await addTransactionToFaucet(ip, limit, address, data.txid);
    // }
    // catch (error: any) {
    //     await sendFailureEmail(ip, address, limit, JSON.stringify(error));
    //     return NextResponse.json(`Could not send tBTC. ${error?.response?.data?.error}`, { status: 500});
    // }

    // try {
    //     await sendEmail(ip, address, limit);

    //     return NextResponse.json(null, { status: 200 });
    // } catch (error) {
    //     await sendFailureEmail(ip, address, limit, JSON.stringify(error));
    //     return NextResponse.json("Something went wrong.", { status: 500 });
    // }
}
