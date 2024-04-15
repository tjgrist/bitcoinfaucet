import QRCode from "qrcode.react";
import useClipboard from "react-use-clipboard";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

export default function BitcoinAddressCard({address}: {address: string}) {
    const { toast } = useToast();

    const [isCopied, setCopied] = useClipboard(address);

    useEffect(() => {
        if (isCopied) {
            toast({
                description: "Copied to clipboard!",
                duration: 3000,
            });
        }
    }, [isCopied, toast]);

    return (
        <div className="space-y-5 items-center flex flex-col">
            <QRCode value={address} />
            <div className="flex space-x-2 md:flex-row">
                <span style={{ wordBreak: 'break-word' }}>{address}&nbsp;</span>
                <div><ClipboardCopyIcon className="cursor-pointer" onClick={setCopied} /></div>
            </div>
        </div>
    )
}