import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { URLSearchParams } from 'url'; // For form encoding


export async function GET(req: NextRequest, res: NextResponse) {

    const clientId = process.env.PAXOS_CLIENT_ID as string;
    const clientSecret = process.env.PAXOS_CLIENT_SECRET as string;
    const tokenEndpoint = `${process.env.PAXOS_AUTH_URL}/oauth2/token`; // Replace with Paxos endpoint

    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        scope: process.env.PAXOS_SCOPES as string,
        client_id: clientId,
        client_secret: clientSecret
    });

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const { data } = await axios.post(tokenEndpoint, body, config);

    return NextResponse.json(data);
}