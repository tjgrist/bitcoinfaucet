import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const fromEmail = process.env.FROM_EMAIL as string;
export const myEmail = process.env.MY_EMAIL as string;

export const sendEmail = async (ip: string) => {
    await resend.emails.send({
        from: fromEmail,
        to: [myEmail],
        subject: 'TBTC Faucet was used!',
        text: `${ip} used the TBTC Faucet!`
    });
};