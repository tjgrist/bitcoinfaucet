"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
        name: e.target.address.value,
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

   await fetch(endpoint, options);
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input name="address" placeholder="TBTC Address" />
        <Button type="submit">Get TBTC</Button>
      </div>
    </form>
  );
}
