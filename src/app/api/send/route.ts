import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import db from '@/lib/firebase';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL as string;
const myEmail = process.env.MY_EMAIL as string;

async function addIp(ip: string) {
    try {
        const faucetRef = doc(db, "config", "faucet");
        const docSnap = await getDoc(faucetRef);

        if (!docSnap.exists()) {
            console.log("No faucet limit doc");
            return;
        }

        const ref = doc(db, "ips", ip);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            if (snap.data().timestamp.toMillis() + 1000 * 60 * 60 * 24 > Date.now()) {
                console.log("Document already exists and is less than 24 hours old");
                return;
            }
            updateDoc(ref, {
                timestamp: new Date()
            });
        }

        await setDoc(doc(db, "ips", ip), {
            timestamp: new Date(),
            tbtc: docSnap.data().limit
        });

        console.log("Document written successfully");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function POST(req: NextRequest, res: NextResponse) {

    const { address } = await req.json();
    
    // get the ip from the req
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.json({ error: 'No IP found' });

    // add the ip to the firestore database collection 'ips'
    await addIp(ip,)

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
