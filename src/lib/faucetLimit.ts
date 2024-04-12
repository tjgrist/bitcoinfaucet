
import { collection, addDoc, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import db from '@/lib/firebase';

export default async function faucetLimit(): Promise<number> {
    const faucetRef = doc(db, "config", "faucet");
    const docSnap = await getDoc(faucetRef);

    if (!docSnap.exists()) {
        console.log("No faucet limit doc");
        return 0;
    }

    return docSnap.data().limit;
}