"use client"

import { ExternalLinkIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { Bitcoin } from "lucide-react"
import Link from "next/link"

export type Transaction = {
  id: string
  tbtc: number
  ip: string,
  timestamp: string,
  txId: string,
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
