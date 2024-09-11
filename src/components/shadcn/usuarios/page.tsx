
import type { JsonUser } from "#Json";
import { getData } from "#functions/peticiones";
import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function UsersTable({ id_tienda }: { id_tienda: number, }) {
  const [result, setResult] = useState<JsonUser[]>([]);

  const obtenerUsuarios = useCallback(async (id_tienda: number): Promise<JsonUser[]> => {
    const data = await getData<JsonUser>(`api/v1/public/usuarios/${id_tienda}`);
    return data;
  }, []);

  useEffect(() => {
    if (id_tienda) {
      obtenerUsuarios(id_tienda).then(data => setResult(data));
    }
  }, [id_tienda, obtenerUsuarios]);
  
  return (
    <>
      <div className="flex flex-col gap-4 mx-10">
        <h1 className="justify-start text-2xl text-principal-color">Usuarios</h1>
        <div className="bg-cuaternary-color rounded-md p-4 gap-3 container mx-auto">
          <DataTable columns={columns} data={result} />
        </div>
      </div>
    </>
  )
}