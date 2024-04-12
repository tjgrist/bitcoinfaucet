import paxosAxios from '@/lib/paxos';

export async function withdrawToAddress(limit: number, address: any, ip: string) {
    const body = {
        profile_id: process.env.PAXOS_PROFILE_ID,
        asset: "BTC",
        amount: `${limit}`,
        destination_address: address,
        metadata: {
            ip_address: ip
        },
        crypto_network: "BITCOIN"
    };
    const { data } = await paxosAxios.post('/transfer/crypto-withdrawals', body);

    return data;
}
