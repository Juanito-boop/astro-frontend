'use client'

import { useEffect, useState } from "react";
import type { facturas } from "@/Json";
import { obtenerUsuario } from "@/functions/app";
import { getData } from "@/functions/peticiones";
import { columns } from './columns';
import { DataTable } from "./data-table";

export default function BillsTable() {
  const [data, setData] = useState<facturas[]>([]);

  async function obtenerColumnasFacturas(tienda: number): Promise<facturas[]> {
    return await getData<facturas>(`/api/public/facturas/listarPorTienda/${tienda}`);
  }

  const fetchData = async () => {
    const usuario = obtenerUsuario()
    const tienda = usuario?.id_tienda

    if (tienda != undefined){
      const result = await obtenerColumnasFacturas(tienda);
      const modifiedResult = result.map(item => {
        const fecha = new Date(item.fecha_venta);
        return { ...item, fecha_venta: fecha.toISOString().split('T')[0] };
      });
      setData(modifiedResult);
    }
  }

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 mx-10">
        <h1 className="justify-start text-2xl text-principal-color">Facturas</h1>
        <div className="bg-[#F4E9E9] rounded-md p-4 gap-3 container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}