import { obtenerUsuario } from "#functions/app"
import { getData, postData } from "#functions/peticiones"
import type { Detalles, productos, ProductosFacturas } from "#Json"
import { useState } from "react"
import { Factura, RenderColumnas, RenderizadoProductos } from "./renderizado"
import { handleCheckButtonClick, handlePlusButtonClick, handleTrashButtonClick } from "./botones"
import { formatTotalBill } from "./operaciones"

export default function NewBillPage() {
  //------------------------
  // constantes
  const usuario = obtenerUsuario()
  const tienda = usuario.id_tienda

  const [products, setProducts] = useState<ProductosFacturas[]>([
    {
      id_producto: 0,
      quantity: null,
      disabled: true,
      selectDisabled: false,
      showPlusButton: false,
    },
  ])
  const [productosPost, setProductosPost] = useState<Detalles[]>([])
  const [fetchProductos, setFetchProductos] = useState<productos[]>([])
  const [totalBill, setTotalBill] = useState(0)
  const [currentDate, setCurrentDate] = useState('')

  const newProducts = products.map((product) => {
    const fetchedProduct = fetchProductos.find((prod) => prod.id_producto === product.id_producto)
    if (fetchedProduct) {
      return {
        id: 'none',
        nombre_producto: fetchedProduct.nombre,
        valor_producto_unitario: fetchedProduct.precio_unitario.toString(),
        valor_producto_total: (fetchedProduct.precio_unitario * (product.quantity || 0)).toString(),
        vendedor: usuario.username,
        fecha_venta: new Date(),
        cantidad_producto: product.quantity,
        id_tienda: fetchedProduct.id_tienda,
        id_producto: fetchedProduct.id_producto,
      } as Detalles
    }
    return null
  })
  .filter((product) => product !== null) as Detalles[]
  //------------------------
  
  //------------------------
  // funciones asincronas
  async function productos(tienda: number): Promise<productos[]> {
    try {
      return await getData<productos>(`/api/public/productos/listarPorId/${tienda}`)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function obtenerProductos() {
    const productosFromServer = await productos(tienda)
    setFetchProductos(productosFromServer)
  }

  async function postFacturaGeneral() {
    return await postData(`/api/public/facturas/crear`, {
      fecha_venta: new Date(),
      vendedor_factura: usuario.username,
      cantidad_producto: sumarCantidades(),
      id_tienda: tienda,
    })
  }

  function calcularTotal(): number {
    let total = 0
    products.forEach((product) => {
      const selectedProduct = fetchProductos.find((prod) => prod.id_producto === product.id_producto)
      if (selectedProduct && product.quantity) {
        total += selectedProduct.precio_unitario * product.quantity || 0
      }
    })
    return total
  }

  function updateTotalBill() {
    const total = calcularTotal()
    setTotalBill(total)
  }

  function sumarCantidades(): number {
    let total = 0
    products.forEach((product) => {
      total += product.quantity || 0
    })
    return total
  }

  function updateProduct(
    index: number,
    id_producto: number,
    quantity: number,
    disabled: boolean,
    selectDisabled: boolean,
  ) {
    const newProducts = [...products]
    newProducts[index] = { ...newProducts[index], id_producto, quantity, disabled, selectDisabled }
    setProducts(newProducts)
  }

  function handleSelectChange(index: number, e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target
    updateProduct(index, Number(value), products[index].quantity || 0, value === '0', false)
  }

  function handleQuantityChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    const selectDisabled = products[index].selectDisabled
    updateProduct(
      index,
      products[index].id_producto,
      Number(value),
      products[index].disabled,
      selectDisabled !== undefined ? selectDisabled : false,
    )
  }
  //------------------------

  //------------------------
  function renderColumnasYProductosConGap(gap: number) {
    return (
      <>
        {RenderColumnas(gap)}
        <RenderizadoProductos
          gap={gap}
          products={products}
          fetchProductos={fetchProductos}
          handlePlusButtonClick={() => handlePlusButtonClick(setProducts)}
          handleSelectChange={handleSelectChange}
          handleQuantityChange={handleQuantityChange}
          handleCheckButtonClick={(index) => handleCheckButtonClick(index, products, setProducts)}
          handleTrashButtonClick={(index) => handleTrashButtonClick(index, setProducts)}
        />
      </>
    )
  }
  //------------------------

  if (!usuario) {
    return <h1>Usuario no encontrado</h1>
  }else{
    return (
      <>
        <div className="mx-10">
          <h1 className="text-principal-color text-2xl">Crear Nueva Factura</h1>
          <form action="" className="bg-secondary-color my-5 p-4 rounded-md grid grid-cols-[70%_1fr] gap-x-2">
            <div>
              <div className="my-3 flex flex-row gap-2 h-[2.5rem]">
                <label className="w-[5%]"></label>
                <input
                  type="text"
                  className="w-[30%] pl-2 rounded-md"
                  value={`Total productos: ${products.filter((product) => product.id_producto !== 0).length}`}
                  disabled
                />
                <input type="text" className="w-[30%] pl-2 rounded-md" value={`Cajero: ${usuario.username}`} disabled />
              </div>
              <div className="overflow-y-auto max-h-[300px]">{renderColumnasYProductosConGap(1)}</div>
            </div>
            <Factura
              currentDate={currentDate}
              sumarCantidades={sumarCantidades}
              postFacturaGeneral={postFacturaGeneral}
              formattedTotalBill={formatTotalBill(totalBill)}
            />
          </form>
        </div>
      </>
    )
  }
}