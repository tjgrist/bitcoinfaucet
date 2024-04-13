
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import db from '@/lib/firebase';

export async function getLatestTransactionByIp(ip: string) {
    const q = query(
        collection(db, "faucet"),
        where("ip", "==", ip),
        orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(q);
    const latestDocument = querySnapshot.docs[0]; // Assuming a document is found

    if (latestDocument) {
        if (latestDocument.data().timestamp.toMillis() + 1000 * 60 * 60 * 24 > Date.now()) {
            throw new Error("Document already exists and is less than 24 hours old.");
        }
    } else {
        console.log("No matching document found.");
    }
}