import type { JsonCategory, productos } from "#Json";
import { obtenerUsuario } from "#functions/app";
import { getData, postData } from "#functions/peticiones";
import { useEffect, useState } from "react";

export default function NewProductForm() {
  const [fetchCategorias, setFetchCategorias] = useState<JsonCategory[]>([]);
  const [productoCreado, setProductoCreado] = useState<productos>();
  const [producto, setProducto] = useState({
    categoria: 0,
    descripcion: '',
    existencia: 0,
    fechaCaducidad: new Date(),
    marca: '',
    nombre: '',
    precio: 0,
    tienda: 0,
  });

  const usuario = obtenerUsuario();

  useEffect(() => {
    const obtenerCategorias = async () => {
      const categoriasFromServer = await fetchCategoria();
      setFetchCategorias(categoriasFromServer);
    };

    obtenerCategorias();
  }, []);

  if (productoCreado) {
    window.location.href = `/astro-frontend/dashboard/administrador/productos`;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: getUpdatedValue(name, value, prev),
    }));
  };

  const getUpdatedValue = (name: string, value: string, prev: typeof producto) => {
    if (name === 'precio' || name === 'existencia') {
      return parseFloat(value);
    }
    if (name === 'fechaCaducidad') {
      return new Date(value);
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = { ...producto, tienda: usuario.id_tienda };
    setProducto(updatedProduct);
    await newData(updatedProduct);
  };

  async function fetchCategoria(): Promise<JsonCategory[]> {
    return await getData<JsonCategory>(`api/v1/public/categorias/${usuario.id_tienda}`);
  }

  const newData = async (product: typeof producto) => {
    try {
      const productoCreado = await postData<productos>('api/v1/public/productos/', product);
      setProductoCreado(productoCreado);
    } catch (err) {
      console.error('Error creando producto: ' + err);
    }
  };

  return (
    <form className="bg-secondary-color rounded-md grid p-4 grid-cols-2 gap-x-2 [&>input]:p-2 [&>input]:rounded-md [&>div>input]:p-2 [&>div>input]:rounded-md" onSubmit={handleSubmit}>
      <label htmlFor="nombre" className="text-principal-color" children="Nombre"/>
      <input
        type="text"
        className="bg-white col-span-2"
        name="nombre"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={handleChange}
      />
      <label htmlFor="marca" className="text-principal-color" children="Marca"/>
      <input
        type="text"
        className="bg-white col-span-2"
        name="marca"
        placeholder="Marca del producto"
        value={producto.marca}
        onChange={handleChange}
      />
      <div className="col-span-1 flex flex-col">
        <label htmlFor="precio" className="text-principal-color" children="Precio"/>
        <input
          type="number"
          name="precio"
          placeholder="$10,00"
          value={producto.precio}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="fechaCaducidad" className="text-principal-color" children="Fecha caducidad"/>
        <input
          type="date"
          name="fechaCaducidad"
          value={producto.fechaCaducidad.toISOString().substring(0, 10)}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="existencia" className="text-principal-color" children="Existencia"/>
        <input
          type="number"
          name="existencia"
          placeholder="1"
          value={producto.existencia}
          onChange={handleChange}
        />
      </div>
      <div className="col-span-1 flex flex-col">
        <label htmlFor="categoria" className="text-principal-color" children="Categoría"/>
        <select
          name="categoria"
          id="cat"
          className="h-full rounded-md p-2"
          value={producto.categoria}
          onChange={handleChange}
        >
          <option value="0">Selecciona una opción</option>
          {fetchCategorias.map((categoria) => (
            <option key={categoria.id_categoria} value={categoria.id_categoria}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="descripcion"
        id="descripcion"
        className="col-span-2 mt-2 rounded-md p-2"
        placeholder="Descripción del producto"
        value={producto.descripcion}
        onChange={handleChange}
      />
      <button type="submit" className="bg-principal-color py-2 text-center col-span-2 text-white mt-2 rounded-md">Guardar</button>
    </form>
  );
}
