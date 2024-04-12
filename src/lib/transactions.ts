import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore";
import db from "./firebase";

export async function getTransactions(ip?: string) {
    let q;
    if (ip) {
        q = query(
            collection(db, "faucet"),
            where("ip", "==", ip),
            orderBy("timestamp", "desc")
        );
    }
    else {
        q = query(
            collection(db, "faucet"),
            orderBy("timestamp", "desc")
        );
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return ({
            ...data,
            id: doc.id,
            timestamp: data.timestamp.toDate().toLocaleDateString(),
        })
    });
}