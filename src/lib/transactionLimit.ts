// import { getBalance } from "./balance";

// // 1% of balance for the limit
// export async function getTransactionLimit() {
//     const balance = await getBalance();
//     return balance * 0.001;
// }

import faucetConfig from "./faucetLimit";

// 1% of balance for the limit
export async function getTransactionLimit() {
    const config = await faucetConfig();
    return config.limit;
}