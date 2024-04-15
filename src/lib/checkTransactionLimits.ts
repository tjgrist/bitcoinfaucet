
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import db from '@/lib/firebase';

export async function checkTransactionLimits(ip: string, address: string, dailyLimit: number) {
    const dailyLimitQ = query(
        collection(db, "faucet"),
        where("timestamp", ">=", new Date(Date.now() - 1000 * 60 * 60 * 24)),
    );

    const dailyLimitQuerySnapshot = await getDocs(dailyLimitQ);
    if (dailyLimitQuerySnapshot.docs.length > dailyLimit) {
        throw new Error("Daily limit reached.");
    }

    const addressQ = query(
        collection(db, "faucet"),
        where("address", "==", address),
        orderBy("timestamp", "desc")
    );

    const addressQuerySnapshot = await getDocs(addressQ);
    const latestAddressDocument = addressQuerySnapshot.docs[0]; // Assuming a document is found

    if (latestAddressDocument) {
        if (latestAddressDocument.data().timestamp.toMillis() + 1000 * 60 * 60 * 24 > Date.now()) {
            throw new Error("Address already used today.");
        }
    }

    const ipQ = query(
        collection(db, "faucet"),
        where("ip", "==", ip),
        orderBy("timestamp", "desc")
    );

    const querySnapshot = await getDocs(ipQ);
    const latestDocument = querySnapshot.docs[0]; // Assuming a document is found

    if (latestDocument) {
        if (latestDocument.data().timestamp.toMillis() + 1000 * 60 * 60 * 24 > Date.now()) {
            throw new Error("IP address already used today.");
        }
    }
}