"use client"

import { ExternalLinkIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Bitcoin, Copy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export type Transaction = {
  id: string
  tbtc: number
  ip: string,
  timestamp: string,
  txId: string,
  address: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "timestamp",
    header: "Date",
  },
  {
    accessorKey: "ip",
    header: "IP Address",
  },
  {
    accessorKey: "address",
    header: "tBTC Address",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [copied, setCopied] = useState(false);
      
      const copyToClipboard = () => {
        navigator.clipboard.writeText(row.getValue("address") as string);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };

      return (
        <div className="flex items-center space-x-2">
          <span>{row.getValue("address")}</span>
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-200 rounded"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          {copied && <span className="text-green-500 text-sm">Copied!</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "tbtc",
    header: "Amount",
    cell: ({ row }) => <div className="flex"><Bitcoin size={18}/>{row.getValue("tbtc")}</div>,
  },
  {
    accessorKey: "txId",
    header: "Transaction",
    cell: ({ row }) => (
      <div>
        <Link className="flex items-center space-x-1" href={`https://blockstream.info/testnet/tx/${row.getValue("txId")}`} target="_blank" rel="noreferrer">
          View&nbsp;
        <ExternalLinkIcon />
        </Link>
      </div>
    ),
  },
]