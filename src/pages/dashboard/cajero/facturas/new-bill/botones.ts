import type { ProductosFacturas } from "#Json";

export function handlePlusButtonClick(setProducts: React.Dispatch<React.SetStateAction<ProductosFacturas[]>>) {
  setProducts((prevProducts) => {
    const newProducts = prevProducts.map((product) => ({
      ...product,
      showPlusButton: false,
    }));
    return [
      ...newProducts,
      { id_producto: 0, quantity: null, disabled: false, selectDisabled: false, showPlusButton: false },
    ];
  });
}

export function handleTrashButtonClick(index: number, setProducts: React.Dispatch<React.SetStateAction<ProductosFacturas[]>>) {
  setProducts((prevProducts) => {
    if (prevProducts.length === 1) {
      return [{ id_producto: 0, quantity: null, disabled: true, selectDisabled: false, showPlusButton: false }];
    } else {
      const newProducts = prevProducts.filter((_, idx) => idx !== index);
      newProducts[newProducts.length - 1] = {
        ...newProducts[newProducts.length - 1],
        showPlusButton: true,
      };
      return newProducts;
    }
  });
}

export function handleCheckButtonClick(index: number, products: ProductosFacturas[], setProducts: React.Dispatch<React.SetStateAction<ProductosFacturas[]>>) {
  const currentProduct = products[index];
  if (currentProduct.id_producto !== 0 && currentProduct.quantity !== 0) {
    const existingProductIndex = products.findIndex(
      (product, idx) => product.id_producto === currentProduct.id_producto && idx !== index,
    );

    if (existingProductIndex !== -1) {
      const updatedQuantity = (products[existingProductIndex].quantity || 0) + (currentProduct.quantity || 0);

      setProducts((prevProducts) => {
        const newProducts = prevProducts.map((product, _idx) => ({
          ...product,
          disabled: true,
          selectDisabled: true,
          showPlusButton: false,
        }));
        newProducts[existingProductIndex] = {
          ...newProducts[existingProductIndex],
          quantity: updatedQuantity,
        };
        newProducts[index] = {
          id_producto: 0,
          quantity: null,
          disabled: false,
          selectDisabled: false,
          showPlusButton: false,
        };
        return newProducts;
      });
    } else {
      setProducts((prevProducts) => {
        const newProducts = prevProducts.map((product, idx) => ({
          ...product,
          disabled: true,
          selectDisabled: true,
          showPlusButton: idx === index,
        }));
        return newProducts;
      });
    }
  }
}