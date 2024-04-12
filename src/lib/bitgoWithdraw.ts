import axios from "axios";

export async function withdrawToAddress(limit: number, address: any, ip: string) {
    const body = {
        amount: `${limit}`,
        address,
        walletPassphrase: process.env.BITGO_WALLET_PASSPHRASE,
    };

    const config = {
        headers: {
            Authorization: `Bearer ${process.env.BITGO_ACCESS_TOKEN}`,
        },
    }
    
    const { data } = await axios.post(`${process.env.BITGO_EXPRESS_URL}/tbtc/wallet/${process.env.BITGO_WALLET_ID}/sendCoins`, body, config);

    return data;
}
