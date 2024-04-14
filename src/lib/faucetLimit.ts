
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import db from '@/lib/firebase';

export default async function faucetConfig(): Promise<DocumentData> {
    const faucetRef = doc(db, "config", "faucet");
    const docSnap = await getDoc(faucetRef);

    if (!docSnap.exists()) {
        console.log("No faucet config doc");
        throw new Error("No faucet config doc");
    }

    return docSnap.data();
}