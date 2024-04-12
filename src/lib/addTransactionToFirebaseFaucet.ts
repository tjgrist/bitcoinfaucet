import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import db from '@/lib/firebase';

export async function addTransactionToFirebaseFaucet(ip: string, limit: number, address: string, txId: string) {
    await setDoc(doc(collection(db, "faucet")), {
        ip: ip,
        timestamp: serverTimestamp(),
        tbtc: limit,
        address,
        txId
    });

    console.log("Document written successfully.");
}
