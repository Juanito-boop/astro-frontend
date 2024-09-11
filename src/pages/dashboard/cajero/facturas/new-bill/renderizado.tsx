import type { FacturaProps, ProductoProps } from "#Json";

export function RenderColumnas(gap: number) {
  return (
    <section className={`grid grid-flow-col grid-cols-[5%_25%_12%_18%_18%_5%_5%] gap-x-${gap} [&>span]:mb-1 [&>span]:pl-1`}>
      <span className="col-start-1">‎</span>
      <span className="col-start-2">Producto</span>
      <span className="col-start-3">Cantidad</span>
      <span className="col-start-4">Precio Unitario</span>
      <span className="col-start-5">Total Producto</span>
      <span className="col-start-6">‎</span>
      <span className="col-start-7">‎</span>
    </section>
  );
}


export const RenderizadoProductos: React.FC<ProductoProps> = ({
  gap,
  products,
  fetchProductos,
  handlePlusButtonClick,
  handleSelectChange,
  handleQuantityChange,
  handleCheckButtonClick,
  handleTrashButtonClick,
}) => {
  return (
    <>
      {products.map((product: any, index: number) => {
        const selectedProduct = fetchProductos.find((prod: any) => prod.id_producto === product.id_producto)

        const total = selectedProduct && product.quantity ? selectedProduct.precio_unitario * product.quantity : 0
        const formattedPrice = selectedProduct
          ? `$${selectedProduct.precio_unitario.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
          : ''

        return (
          <div key={index} className={`grid grid-flow-col grid-cols-[5%_25%_12%_18%_18%_5%_5%] gap-x-${gap} mb-2`}>
            {product.showPlusButton && (
              <button
                type="button"
                className="rounded-md h-[2.5rem] w-full m-auto col-start-1 bg-principal-color"
                onClick={handlePlusButtonClick}
              >
                <img src="/astro-frontend/plus.svg" width="24" height="24" alt="plus icon" className="m-auto" />
              </button>
            )}
            <select
              value={product.id_producto}
              onChange={(e) => handleSelectChange(index, e)}
              className={`bg-white rounded-md pl-3 h-[2.5rem] col-span-1 col-start-2 ${
                product.selectDisabled ? 'disabled' : ''
              }`}
              disabled={product.selectDisabled}
            >
              <option value="0">Seleccione un producto</option>
              {fetchProductos.map((producto: any) => (
                <option key={producto.id_producto} value={producto.id_producto}>
                  {producto.nombre}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={product.quantity || ''}
              min="1"
              step="1"
              onChange={(e) => {
                if (parseInt(e.target.value) < 0) {
                  e.target.value = '0'
                }
                handleQuantityChange(index, e)
              }}
              className="bg-gray h-[2.5rem] pl-3 rounded-md disabled:bg-white/80 col-start-3"
              placeholder="Cantidad"
              disabled={product.disabled}
            />
            <input
              type="text"
              value={formattedPrice || '$0'}
              className="bg-white/80 h-[2.5rem] pl-3 rounded-md col-start-4"
              disabled
            />
            <input
              type="text"
              value={`$${total || 0}`}
              className="bg-white/80 h-[2.5rem] pl-3 rounded-md col-start-5"
              disabled
            />
            <button
              type="button"
              className="rounded-md h-[2.5rem] m-auto col-start-6"
              onClick={() => handleCheckButtonClick(index)}
            >
              <img src="/astro-frontend/check.svg" width="24" height="24" alt="check icon" className="m-auto" />
            </button>

            <button
              type="button"
              className="rounded-md h-[2.5rem] m-auto col-start-7"
              onDoubleClick={() => handleTrashButtonClick(index)}
            >
              <img src="/astro-frontend/trash.svg" width="24" height="24" alt="trash icon" className="m-auto" />
            </button>
          </div>
        )
      })}
    </>
  )
}