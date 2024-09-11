import type { JsonCategory } from "#Json.ts";
import { obtenerUsuario } from "#functions/app.ts";
import { postData } from "#functions/peticiones.ts";
import { useState } from "react";

export default function NewCategoryForm() {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [categoriaCreada, setCategoriaCreada] = useState<JsonCategory | undefined>(undefined);
  const usuario = obtenerUsuario();
  const id = usuario.id_tienda;

  if (categoriaCreada) {
    window.location.href = `/astro-frontend/dashboard/administrador/productos/new-product`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await newData();
  };

  const newData = async () => {
    try {
      const categoria = await postData<JsonCategory>(
        "api/v1/public/categorias/",
        {
          nombre,
          descripcion,
          id_tienda: id,
        }
      );
      console.log(categoria);
      setCategoriaCreada(categoria);
    } catch (err) {
      console.error("Error creando categoria: " + err);
    }
  };
  return (
      <form className="bg-secondary-color rounded-md grid p-4 grid-cols-2 gap-y-2 [&>input]:p-2 [&>input]:rounded-md [&>div>input]:p-2 [&>div>input]:rounded-md">
        <div className="flex flex-col col-span-2">
          <label htmlFor="nombre" children="Nombre"/>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la categoria"
            onChange={(event) => setNombre(event.target.value)}
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="desc" children="Descripcion"/>
          <input
            type="text"
            placeholder="Descripcion de la categoria"
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="bg-principal-color rounded-md col-span-2 py-2">
          Guardar
        </button>
      </form>
  );
}
