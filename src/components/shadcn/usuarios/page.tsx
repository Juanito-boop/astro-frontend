
import type { JsonUser } from "#Json";
import { getData } from "#functions/peticiones";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function UsersTable({ id_tienda }: { id_tienda: number, }) {
  const [result, setResult] = useState<JsonUser[]>([]);
  
  async function obtenerUsuarios( id_tienda: number ): Promise<JsonUser[]> {
    return await getData<JsonUser>(`/api/public/usuario/listarInfo/${id_tienda}`);
  }
  
  useEffect(() => {
    obtenerUsuarios( id_tienda ).then(data => setResult(data));
  }, [id_tienda]);
  
  return (
    <>
      <div className="flex flex-col gap-4 mx-10">
        <h1 className="justify-start text-2xl text-principal-color">Usuarios</h1>
        <div className="bg-[#F4E9E9] rounded-md p-4 gap-3 container mx-auto">
          <DataTable columns={columns} data={result} />
        </div>
      </div>
    </>
  )
}