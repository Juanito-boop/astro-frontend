import { obtenerFecha, obtenerUsuario } from "#functions/app";
import { getData, postData } from "#functions/peticiones";
import type { Detalles, DetallesFacturas, productos, ProductosFacturas } from "#Json";
import { type FacturaInfo } from "#Json";
import { useEffect, useState } from "react";
import { RenderColumnas, RenderizadoProductos } from "./renderizado";
import {
  handleCheckButtonClick,
  handlePlusButtonClick,
  handleTrashButtonClick,
} from "./botones";
import { formatTotalBill } from "./operaciones";
import { TailSpin } from "react-loader-spinner"; // Importar el componente de carga

export default function NewBillPage() {
  //------------------------
  // constantes
  const usuario = obtenerUsuario();
  const tienda = usuario.id_tienda;
  console.log(tienda);
  //------------------------

  const [fetchedProducts, setFetchedProducts] = useState<productos[]>([]);
  const [totalBill, setTotalBill] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [products, setProducts] = useState<ProductosFacturas[]>([
    {
      id_producto: 0,
      quantity: null,
      disabled: true,
      selectDisabled: false,
      showPlusButton: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);  // Estado de carga
  const [error, setError] = useState<string | null>(null);  // Estado de error
  console.log(products);
  //------------------------
  // funciones asincronas
  async function fetchProductsByStore(tienda: number): Promise<productos[]> {
    try {
      return await getData<productos>(`api/v1/public/productos/${tienda}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function obtenerProductos() {
    console.log("obtenerProductos se está ejecutando");
    if (tienda !== 0) {
      try {
        const productsResponse = await fetchProductsByStore(tienda);
        setFetchedProducts(productsResponse);
      } catch (error) {
        setError("Error al obtener los productos de la tienda.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("La tienda es 0, no se obtendrán productos");
      setIsLoading(false);
    }
  }

  function calcularTotal(): number {
    let total = 0;
    products.forEach((product) => {
      const selectedProduct = fetchedProducts.find(
        (prod) => prod.id_producto === product.id_producto
      );
      if (selectedProduct && product.quantity) {
        total += selectedProduct.precio_unitario * product.quantity || 0;
      }
    });
    return total;
  }

  function updateTotalBill() {
    const total = calcularTotal();
    setTotalBill(total);
  }

  function sumarCantidades(): number {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity || 0;
    });
    return total;
  }

  function updateProduct(
    index: number,
    id_producto: number,
    quantity: number,
    disabled: boolean,
    selectDisabled: boolean
  ) {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      id_producto,
      quantity,
      disabled,
      selectDisabled,
    };
    setProducts(newProducts);
  }

  function handleSelectChange(
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = e.target;
    updateProduct(
      index,
      Number(value),
      products[index].quantity || 0,
      value === "0",
      false
    );
  }

  function handleQuantityChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = e.target;
    const selectDisabled = products[index].selectDisabled;
    updateProduct(
      index,
      products[index].id_producto,
      Number(value),
      products[index].disabled,
      selectDisabled !== undefined ? selectDisabled : false
    );
  }

  async function createBill() {
    const detalles: Omit<DetallesFacturas, 'id_factura'>[] = products
      .map(({ id_producto, quantity }) => ({
        cantidad_producto: quantity,
        fecha_creacion: new Date(),
        id_producto,
      })).filter(detalle => !(
        detalle.cantidad_producto === null &&
        detalle.id_producto === 0
      ));

    console.log({
      "factura": {
        fecha_venta: new Date(),
        vendedor_factura: usuario.username,
        cantidad_producto: sumarCantidades(),
        id_tienda: tienda,
      },
      "detalles": detalles
    });

    return await postData(`api/v1/public/detalles/`, {
      "factura": {
        fecha_venta: new Date(),
        vendedor_factura: usuario.username,
        cantidad_producto: sumarCantidades(),
        id_tienda: tienda,
      },
      "detalles": detalles
    });
  }

  useEffect(() => {
    console.log("useEffect se está ejecutando");
    obtenerProductos();
    setCurrentDate(obtenerFecha());
  }, []);

  useEffect(() => {
    updateTotalBill();
  }, [products]);

  useEffect(() => {
    // Verificar si las opciones del select son solo la opción 0 y hacer la petición automáticamente
    if (!isLoading && fetchedProducts.length === 0) {
      const optionZeroOnly = products.every(product => product.id_producto === 0);
      if (optionZeroOnly) {
        obtenerProductos();
      }
    }
  }, [isLoading, fetchedProducts, products]);

  //------------------------

  function renderColumnasYProductosConGap(gap: number) {
    return (
      <>
        {RenderColumnas(gap)}
        <RenderizadoProductos
          gap={gap}
          products={products}
          fetchProductos={fetchedProducts}
          handlePlusButtonClick={() => handlePlusButtonClick(setProducts)}
          handleSelectChange={handleSelectChange}
          handleQuantityChange={handleQuantityChange}
          handleCheckButtonClick={(index) =>
            handleCheckButtonClick(index, products, setProducts)
          }
          handleTrashButtonClick={(index) =>
            handleTrashButtonClick(index, setProducts)
          }
        />
      </>
    );
  }

  if (!usuario) {
    return <h1>Usuario no encontrado</h1>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="mx-10">
        <h1 className="text-principal-color text-2xl" children="Crear Nueva Factura" />
        <form action="" className="bg-secondary-color my-5 p-4 rounded-md grid grid-cols-[70%_1fr] gap-x-2" >
          <section>
            <div className="my-3 flex flex-row gap-2 h-[2.5rem]">
              <label className="w-[5%]" children="" />
              <input
                type="text"
                className="w-[30%] pl-2 rounded-md"
                disabled
                value={`Total productos: ${
                  products.filter((product) => product.id_producto !== 0).length
                }`}
              />
              <input type="text" className="w-[30%] pl-2 rounded-md" value={`Cajero: ${usuario.username}`} disabled />
            </div>
            <div className="overflow-y-auto max-h-[300px]" children={renderColumnasYProductosConGap(1)} />
          </section>
          {/* <Factura
            currentDate={currentDate} sumarCantidades={sumarCantidades}
            postFacturaGeneral={postFacturaGeneral} formattedTotalBill={} /> */}
          <div className="mt-3">
            <h2 className="text-black text-center text-2xl" children="FACTURA" />
            <div className="flex flex-col gap-3">
              <section className="grid grid-flow-col grid-cols-3 gap-x-1">
                <section className="flex flex-col">
                  <label htmlFor="fecha" className="text-black" children="Fecha" />
                  <input type="text" name="fecha" className="bg-white/80 px-2 h-[2.5rem] rounded-md" value={currentDate} disabled />
                </section>
                <section className="flex flex-col">
                  <label htmlFor="catidadTotal" className="text-black" children="Productos" />
                  <input type="text" name="cantidadTotal" className="bg-white/80 px-2 h-[2.5rem] rounded-md" value={sumarCantidades().toString()} disabled />
                </section>
                <section className="flex flex-col">
                  <label htmlFor="catidadTotal" className="text-black" children="‎" />
                  <button type="submit" className="mx-auto bg-principal-color rounded-md text-tertiary-color max-h-[2.5rem] min-h-[2.5rem] w-full" onClick={createBill} children="Crear Factura" />
                </section>
              </section>
              <section className="flex flex-col">
                <label htmlFor="total" className="text-black" children="Total de Factura" />
                <input type="text" name="total" className="w-full bg-white/80 px-2 h-[2.5rem] rounded-md" value={formatTotalBill(totalBill)} disabled />
              </section>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
