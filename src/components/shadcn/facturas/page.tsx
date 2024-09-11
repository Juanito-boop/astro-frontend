import { useCallback, useEffect, useState } from "react";
import type { facturas } from "#Json";
import { obtenerUsuario } from "#functions/app";
import { getData } from "#functions/peticiones";
import { columns } from './columns';
import { DataTable } from "./data-table";

export default function BillsTable() {
  const [data, setData] = useState<facturas[]>([]);
  const usuario = obtenerUsuario();
  const tienda = usuario?.id_tienda;

  const obtenerColumnasFacturas = async (tienda: number): Promise<facturas[]> => {
    return getData<facturas>(`api/v1/public/facturas/${tienda}`);
  };

  const fetchData = useCallback(async () => {
    if (tienda) {
      const result = await obtenerColumnasFacturas(tienda);
      const modifiedResult = result.map((item) => ({
        ...item,
        fecha_venta: new Date(item.fecha_venta).toISOString().split("T")[0],
      }));
      setData(modifiedResult);
    }
  }, [tienda]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <>
      <div className="flex flex-col gap-4 mx-10">
        <h1 className="justify-start text-2xl text-principal-color">Facturas</h1>
        <div className="bg-cuaternary-color rounded-md p-4 gap-3 container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}