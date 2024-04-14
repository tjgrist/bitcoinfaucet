"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { mutate } from "swr";
import { useToast } from "@/components/ui/use-toast"
import { Bitcoin } from "lucide-react";

export default function Form() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    const data = {
      address: e.target.address.value,
    };
    const body = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };

    const response = await fetch(endpoint, options);
    if (response.status === 200) {
      toast({
        description: "Success! You will receive your TBTC shortly.",
        duration: 5000,
      })
    }
    else {
      const error = await response.json();
      toast({
        variant: "destructive",
        description: error,
        duration: 5000,
      })
    }
    setSending(false);
    mutate("/api/transactions");
  };

  const button = useMemo(() => {
    if (sending) return "Sending...";
    if (sent) {
      setTimeout(() => {
        setSent(false);
      }, 3000);
      return "Sent!";
    }
    return "Get bitcoin";
  }, [sending, sent]);

  return (
    <div className="flex-grow">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-1 w-full max-w-xl items-center space-x-2 justify-center">
          <Bitcoin size={24} />
          <Input disabled={sending} required type="address" id="address" placeholder="Bitcoin address, e.g. tb1qhqqqals048gr7g4uwnre35cmjlrlj745h85nk4 *" name="address" defaultValue="tb1qhqqqals048gr7g4uwnre35cmjlrlj745h85nk4" />
          <Button disabled={sending} type="submit">{button}</Button>
        </div>
      </form>
    </div>
  );
}
