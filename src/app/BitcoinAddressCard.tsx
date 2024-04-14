import { Bitcoin, ClipboardCopy } from "lucide-react";
import QRCode from "qrcode.react";
import useClipboard from "react-use-clipboard";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

export default function BitcoinAddressCard() {
    const btcDepositAddress = "2NDkCKa2hWK15q2nPx8hegadgWP9nePk4Tt"
    const { toast } = useToast();

    const [isCopied, setCopied] = useClipboard(btcDepositAddress);

    useEffect(() => {
        if (isCopied) {
            toast({
                description: "Copied to clipboard!",
                duration: 3000,
            });
        }
    }, [isCopied, toast]);

    return (
        <div className="space-y-5">
            <QRCode value={btcDepositAddress} />
            <div className="flex flex-row space-x-2">
                <div>{btcDepositAddress}&nbsp;</div>
                <div><ClipboardCopyIcon className="cursor-pointer" onClick={setCopied} /></div>
            </div>
        </div>
    )
}