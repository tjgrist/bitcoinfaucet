import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, getDoc, doc, setDoc, updateDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import db from '@/lib/firebase';
import paxosAxios, { getNewToken } from '@/lib/paxos';
import faucetLimit from '@/lib/faucetLimit';
import { Network, validate } from 'bitcoin-address-validation';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL as string;
const myEmail = process.env.MY_EMAIL as string;

async function addTransactionToFaucet(ip: string, limit: number, address: string) {
    try {
        // get the latest document in the 'faucet' collection with the field 'ip' equal to the ip
        const q = query(
            collection(db, "faucet"), 
            where("ip", "==", ip), 
            orderBy("timestamp", "desc"),
        );

        const querySnapshot = await getDocs(q);
        const latestDocument = querySnapshot.docs[0]; // Assuming a document is found

        if (latestDocument) {
            if (latestDocument.data().timestamp.toMillis() + 1000 * 60 * 60 * 24 > Date.now()) {
                console.log("Document already exists and is less than 24 hours old.");
                return;
            }
        } else {
            console.log("No matching document found.");
        }

        await setDoc(doc(collection(db, "faucet")), {
            ip: ip,
            timestamp: serverTimestamp(),
            tbtc: limit,
            address
        });

        console.log("Document written successfully.");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();

    if (!address) return NextResponse.json({ error: 'No address found.' });

    if (!validate(address, 'testnet' as Network)) return NextResponse.json({ error: 'Invalid address' });

    // get the ip from the req
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.json({ error: 'No IP found.' });

    const limit = await faucetLimit();

    try {
        const body = {
            profile_id: process.env.PAXOS_PROFILE_ID,
            asset: "BTC",
            amount: `${limit}`,
            destination_address: address,
            metadata: {
                ip_address: ip
            },
            crypto_network: "BITCOIN"
        };
        const { data } = await paxosAxios.post('/transfer/crypto-withdrawals', body);
    
        console.log(body, data);
    }
    catch (error) {
        console.error('Error creating withdrawal', error);
        return NextResponse.json({ error });
    }


    // add the ip to the firestore database collection 'ips'
    await addTransactionToFaucet(ip, limit, address)

    try {
        const responseToMe = await resend.emails.send({
            from: fromEmail,
            to: [myEmail],
            subject: 'TBTC Faucet was used!',
            text: `${ip} used the TBTC Faucet!`
        });

        return NextResponse.json(responseToMe);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
