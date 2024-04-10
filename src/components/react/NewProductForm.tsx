import type { JsonCategory, productos } from "#Json"
import { obtenerUsuario } from "#functions/app"
import { getData, postData } from "#functions/peticiones"
import { useEffect, useState } from "react"

export default function newProductForm(){
  const [categoria      , setCategoria      ] = useState<number>(0)
  const [descripcion    , setDescripcion    ] = useState<string>('')
  const [existencia     , setExistencia     ] = useState<number>(0)
  const [fechaCaducidad , setFechaCaducidad ] = useState<Date>(new Date())
  const [fetchCategorias, setFetchCategorias] = useState<JsonCategory[]>([])
  const [marca          , setMarca          ] = useState<string>('')
  const [nombre         , setNombre         ] = useState<string>('')
  const [precio         , setPrecio         ] = useState<number>(0)
  const [productoCreado , setProductoCreado ] = useState<productos>()
  const [tienda         , setTienda         ] = useState<number>(0)
  
  const usuario = obtenerUsuario()

  if(productoCreado){
    window.location.href = `/astro-frontend/dashboard/administrador/productos`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTienda(usuario.id_tienda);
    await newData();
  }

  async function fetchCategoria(): Promise<JsonCategory[]> {
    return await getData<JsonCategory>(`api/public/categorias/listar`);
  }

  const newData = async () => {
    try{
      const productoCreado = await postData<productos>(
        'api/public/productos/crear', {
          nombre: nombre,
          marca: marca,
          precio_unitario: precio,
          fecha_caducidad: fechaCaducidad,
          descripcion: descripcion,
          stock: existencia,
          id_categoria: categoria,
          id_tienda: tienda
        }
      );
      setProductoCreado(productoCreado);
    }catch(err){
      console.error('Error creando producto: ' + err);
    }
  }

  useEffect(() => {
    const obtenerCategorias = async () => {
      const categoriasFromServer = await fetchCategoria();
      setFetchCategorias(categoriasFromServer);
    }

    obtenerCategorias();
  }, []);

  return (
    <>
      <form className="bg-secondary-color rounded-md grid p-4 grid-cols-2 gap-x-2 [&>input]:p-2 [&>input]:rounded-md [&>div>input]:p-2 [&>div>input]:rounded-md">
        <label htmlFor="nombre" className="text-principal-color">Nombre</label>
        <input type="text" className="bg-white col-span-2" name="nombre" placeholder="Nombre del producto" 
          onChange={(event) => setNombre(event.target.value)} />
        <label htmlFor="marca" className="text-principal-color">Marca</label>
        <input type="text" className="bg-white col-span-2" name="marca"placeholder="marca del producto" 
          onChange={(event) => setMarca(event.target.value)} />
        <div className="col-span-1 flex flex-col">
          <label htmlFor="precio_unitario" className="text-principal-color">Precio</label>
          <input type="number" name="precio_unitario"placeholder="$10,00" 
            onChange={(event) => setPrecio(parseFloat(event.target.value) >= 0 ? parseFloat(event.target.value) : 0)} />
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor="fecha_caducidad" className="text-principal-color">Fecha caducidad</label>
          <input type="date"name="fecha_caducidad"placeholder="2023-08-23" 
            onChange={(event) => setFechaCaducidad(new Date(event.target.value))} />
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor="stock" className="text-principal-color">Existencia</label>
          <input type="number" name="stock"placeholder="1" 
            onChange={(event) => setExistencia(parseFloat(event.target.value) >= 0 ? parseFloat(event.target.value) : 0)} />
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor="id_categoria" className="text-principal-color">Categoria</label>
          <select name="id_categoria" id="cat" className="h-full rounded-md p-2"
            onChange={(event) => setCategoria(Number(event.target.value))} onClick={fetchCategoria}>
            <option value="0">Selecciona una opcion</option>
            {fetchCategorias.map((categoria) => (
              <option value={categoria.id_categoria}>{categoria.nombre}</option>
            ))}
          </select>
        </div>
        <textarea name="descripcion" id="descripcion" className="col-span-2 mt-2 rounded-md p-2" placeholder="Descripcion del producto"
          onChange={(event) => setDescripcion(event.target.value)} />
        <button type="submit" className="bg-principal-color py-2 text-center col-span-2 text-white mt-2 rounded-md" 
          onClick={handleSubmit}>Guardar</button>
        </form>
    </>
  )
}