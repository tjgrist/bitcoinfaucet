"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { useToast } from "@/components/ui/use-toast"
import { Bitcoin, Shuffle } from "lucide-react";
import Explainer from "./Explainer";

export default function Form() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [val, setVal] = useState("");
  const { toast } = useToast()
  const { data } = useSWR(`/api/transactions`, (url) => fetch(url).then((res) => res.json()));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSending(true);
    const data = {
      address: val,
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
        description: "Success! You will receive your tBTC shortly.",
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
    mutate("/api/transactions?filter=all");
    mutate("/api/transactions?filter=mine");
    mutate("/api/transactions");
    mutate("/api/balance");
    mutate("/api/limits");
  };


  const randomAddress = () => {
    if (!data) return;
    const random = Math.floor(Math.random() * data.length);
    setVal(data[random].address);
  }

  const button = useMemo(() => {
    if (sending) return "Sending...";
    if (sent) {
      setTimeout(() => {
        setSent(false);
      }, 3000);
      return "Sent!";
    }
    return "Get tBTC";
  }, [sending, sent]);

  return (
    <div className="flex-grow">
      <Explainer />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full max-w-2xl space-y-4 mx-auto">
          <div className="flex items-center w-full">
            <Bitcoin size={40} className="mr-4" />
            <Input
              disabled={sending} 
              required 
              id="address" 
              placeholder="Bitcoin address, e.g. tb1qhqqqals048gr7g4uwnre35cmjlrlj745h85nk4 *" 
              name="address"
              className="text-lg py-6 px-4"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            {data && <Shuffle size={30} className="ml-4" onClick={randomAddress}/> }
          </div>
          <Button 
            disabled={sending} 
            type="submit"
            className="w-full text-lg py-6"
          >
            {button}
          </Button>
        </div>
      </form>
    </div>
  );
}