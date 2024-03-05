"use client";

import type { facturas } from "@/Json";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../ui/button";

export const columns: ColumnDef<facturas>[] = [
  {
    accessorKey: "id_factura",
    header: ({ column }) => {
      return (
        <Button
          variant={`ghost`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: "fecha_venta",
    header: ({ column }) => {
      return (
        <Button
          variant={`ghost`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: "vendedor_factura",
    header: ({ column }) => {
      return (
        <Button
          variant={`ghost`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendedor
          <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: "cantidad_producto",
    header: ({ column }) => {
      return (
        <Button
          variant={`ghost`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          # productos
          <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: "id_tienda",
    header: ({ column }) => {
      return (
        <Button
          variant={`ghost`}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID tienda venta
          <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
]
