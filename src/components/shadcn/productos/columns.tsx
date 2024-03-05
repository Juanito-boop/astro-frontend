import type { productos } from "@/Json";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<productos>[] = [
  {
    accessorKey: 'nombre',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Producto <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'marca',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Marca <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'nombreCategoria',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Categoria <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'precio_unitario',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Precio <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'descripcion',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Descripcion <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button variant={`ghost`} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Existencias <ArrowUpDown className={`ml-2 h-4 w-4`} />
        </Button>
      )
    },
  },
]