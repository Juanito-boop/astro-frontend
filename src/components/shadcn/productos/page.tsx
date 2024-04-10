import type { JsonCategory, productos } from "#Json";
import { getData } from "#functions/peticiones";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ProductsTable() {
  const [result, setResult] = useState<productos[]>([])

  async function obtenerProductos(): Promise<productos[]> {
    const responseProduct = await getData<productos>(`api/public/productos/listar`)
    const responseCategory = await getData<JsonCategory>(`api/public/categorias`)
    const data = responseProduct.map((producto) => ({
      ...producto,
      nombreCategoria: obtenerNombreCategoria(producto.id_categoria, responseCategory),
    }))
    return data
  }

  const obtenerNombreCategoria = (idCategoria: number, categorias: JsonCategory[]): string | undefined => {
    const categoriaEncontrada = categorias.find((categoria) => categoria.id_categoria === idCategoria)
    if (categoriaEncontrada) {
      return categoriaEncontrada.nombre
    }
    return undefined
  }


  useEffect(() => {
    obtenerProductos().then((data) => setResult(data))
  }, [])

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