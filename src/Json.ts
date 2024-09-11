export interface JsonUser {
  nombre_rol: string;
  username: string;
  id_tienda: number;
  iat: number;
  exp: number;
}

export interface facturas {
  id_factura?: number;
  fecha_venta: string;
  vendedor_factura: string;
  cantidad_producto: number;
  id_tienda: number;
}

export interface productos {
  id_producto?: number;
  nombre: string;
  marca: string;
  precio_unitario: number;
  fecha_caducidad: string;
  descripcion: string;
  stock: number;
  id_categoria: number;
  id_tienda: number;
}

export interface JsonCategory {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  id_tienda: number;
}

export interface ProductosFacturas {
  id_producto: number;
  quantity: number | null;
  disabled: boolean;
  selectDisabled: boolean;
  showPlusButton: boolean;
}

export interface FacturasGeneral {
  id_factura?: number;
  fecha_venta: Date;
  vendedor_factura: string;
  cantidad_producto: number;
  id_tienda: number;
}

export interface FacturaInfo {
  fecha_venta: Date,
  vendedor_factura: string,
  cantidad_producto: number,
  id_tienda: number;
}

export interface DetallesFacturas {
  id_factura: number;
  id_producto: number;
  cantidad_producto: number | null;
  fecha_creacion: Date;
}

export interface Detalles {
  id: string;
  nombre_producto: string;
  valor_producto_unitario: string;
  valor_producto_total: string;
  vendedor: string;
  fecha_venta: Date;
  cantidad_producto: number;
  id_tienda: number | null;
  id_producto: number;
}

export interface FacturaProps {
  currentDate: string;
  sumarCantidades: () => number;
  postFacturaGeneral: () => void;
  formattedTotalBill: string;
}

export interface ProductoProps {
  gap: number;
  products: ProductosFacturas[];
  fetchProductos: productos[];
  handlePlusButtonClick: () => void;
  handleSelectChange: (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleQuantityChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCheckButtonClick: (index: number) => void;
  handleTrashButtonClick: (index: number) => void;
}

export interface VentasProps {
  tituloTarjeta: string;
  ariaLabel?: string;
}

export interface ProductData {
  count: number;
}

export interface DailyInvoices {
	facturas_diarias: number;
}

export interface MonthlyInvoices {
	facturas_mensuales: 0
}

export interface AnnualInvoices {
	facturas_anuales: number;
}