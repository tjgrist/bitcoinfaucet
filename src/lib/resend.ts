import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const fromEmail = process.env.FROM_EMAIL as string;
export const myEmail = process.env.MY_EMAIL as string;

export const sendEmail = async (ip: string, address: string, limit: number) => {
    await resend.emails.send({
        from: fromEmail,
        to: [myEmail],
        subject: 'TBTC Faucet was used!',
        html: `<div>
            <p>${ip} used the TBTC Faucet!</p>
            <p>send to address: ${address}</p>
            <p>tbtc limit amount: ${limit}</p>
            <p><a href="https://app.bitgo-test.com">Bitgo</a></p>
            <p><a href="https://account.sandbox.paxos.com/login">Paxos</a></p>
        </div>`
    });
};