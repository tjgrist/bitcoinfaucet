import { collection, doc, setDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import db from '@/lib/firebase';

export async function addTransactionToFirebaseFaucet(ip: string, limit: number, address: string) {
    try {
        // get the latest document in the 'faucet' collection with the field 'ip' equal to the ip
        const q = query(
            collection(db, "faucet"),
            where("ip", "==", ip),
            orderBy("timestamp", "desc")
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
