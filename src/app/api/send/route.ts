import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
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

        const docRef = await addDoc(collection(db, "ips"), {
            ip: ip,
            timestamp: new Date(),
            tbtc: docSnap.data().limit
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export async function POST(req: NextRequest, res: NextResponse) {

    // get the ip from the req
    const ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (!ip) return NextResponse.error();

    // add the ip to the firestore database collection 'ips'
    await addIp(ip, )

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
