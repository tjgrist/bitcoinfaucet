"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mutate } from "swr";

export default function Form() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null)
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
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
    else {
      const { error } = await response.json();
      setError(error)
    }
    setSubmitting(false);
    mutate("/api/transactions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-xl items-center space-x-2">
        <Input required type="address" id="address" placeholder="TBTC Address *" name="address" defaultValue="tb1qhqqqals048gr7g4uwnre35cmjlrlj745h85nk4" />
        <Button disabled={submitting} type="submit">Get TBTC</Button>
        {submitted && <p className="text-green-500">Success!</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </form>
  );
}
