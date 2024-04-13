"use client"

import { ColumnDef } from "@tanstack/react-table"
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
    accessorKey: "ip",
    header: "IP Address",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
  },
  {
    accessorKey: "txId",
    header: "Tx",
    cell: ({row}) => (
      <Link href={`https://blockstream.info/testnet/tx/${row.getValue("txId")}`} target="_blank" rel="noreferrer">
        View on Blockstream.info
      </Link>
    ),
  },
]
