"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Form() {

  return (
    <form action="/api/send" method="post">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input name="address" placeholder="TBTC Address" />
        <Button type="submit">Get TBTC</Button>
      </div>
    </form>
  );
}
