import type { JsonCategory, productos } from "#Json";
import { getData } from "#functions/peticiones";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { obtenerUsuario } from "#functions/app";

export default function ProductsTable() {
  const [result, setResult] = useState<productos[]>([])
  const usuario = obtenerUsuario()
  const tienda = usuario?.id_tienda

  async function obtenerProductos(): Promise<productos[]> {
    if (!tienda) return [];

    const [responseProduct, responseCategory] = await Promise.all([
      getData<productos>(`api/v1/public/productos/${tienda}`),
      getData<JsonCategory>(`api/v1/public/categorias/${tienda}`),
    ]);

    return responseProduct.map((producto) => ({
      ...producto,
      nombreCategoria: obtenerNombreCategoria(
        producto.id_categoria,
        responseCategory
      ),
    }));
  }

  const obtenerNombreCategoria = (
    idCategoria: number,
    categorias: JsonCategory[]
  ): string | undefined => {
    return (
      categorias.find((categoria) => categoria.id_categoria === idCategoria)
        ?.nombre || undefined
    );
  };


  useEffect(() => {
    obtenerProductos().then((data) => setResult(data))
  }, [tienda])

  return (
    <>
      <div className="flex flex-col mx-10 gap-4">
        <h1 className="justify-start text-2xl text-principal-color">Productos</h1>
        <div className="bg-cuaternary-color rounded-md p-4 gap-3 container mx-auto">
          <DataTable columns={columns} data={result} />
        </div>
      </div>
    </>
  )
}