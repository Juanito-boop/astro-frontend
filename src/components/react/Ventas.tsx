import { obtenerUsuario } from "#functions/app.ts";
import { getData } from "#functions/peticiones.ts";
import type { AnnualInvoices, DailyInvoices, MonthlyInvoices, ProductData, VentasProps } from "#Json";
import React, { useEffect, useState, useCallback } from "react";

const fetchFacturas = async (id_tienda: number, period: string) => {
	try {
		return await getData(`api/v1/public/facturas/${id_tienda}/${period}`);
	} catch (error) {
		console.error(`Error fetching ${period} invoices:`, error);
		return [];
	}
};

const fetchProductos = async (id_tienda: number) => {
	try {
		return await getData(`api/v1/public/productos/${id_tienda}/counter`);
	} catch (error) {
		console.error(`Error fetching product count:`, error);
		return null;
	}
};

const Ventas: React.FC<VentasProps> = ({ tituloTarjeta, ariaLabel }) => {
	const [data, setData] = useState({
		cantidadFacturasAnuales: 0,
		cantidadFacturasMensuales: 0,
		cantidadFacturasDiarias: 0,
		cantidadProductos: 0,
	});

	const usuario = obtenerUsuario();

	const fetchData = useCallback(async () => {
		const [dataYear, dataMonth, dataDay, dataProducts] = await Promise.all([
			fetchFacturas(usuario.id_tienda ?? 0, "annual"),
			fetchFacturas(usuario.id_tienda ?? 0, "monthly"),
			fetchFacturas(usuario.id_tienda ?? 0, "daily"),
			fetchProductos(usuario.id_tienda ?? 0),
		]);

		setData({
			cantidadFacturasAnuales: (dataYear as unknown as AnnualInvoices).facturas_anuales,
			cantidadFacturasMensuales: (dataMonth as unknown as MonthlyInvoices).facturas_mensuales,
			cantidadFacturasDiarias: (dataDay as unknown as DailyInvoices).facturas_diarias,
			cantidadProductos: (dataProducts as unknown as ProductData).count,
		});
	}, [usuario.id_tienda]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const tarjetaValores = {
		"Ventas anuales": data.cantidadFacturasAnuales,
		"Ventas mensuales": data.cantidadFacturasMensuales,
		"Ventas diarias": data.cantidadFacturasDiarias,
		"Cantidad de productos": data.cantidadProductos,
	};

	return (
		<article>
			<div className="rounded-t-md bg-secondary-color text-center py-2 px-5" children={tituloTarjeta}/>
			<input
				type="text"
				className="bg-tertiary-color rounded-b-md p-5 text-center"
				value={tarjetaValores[tituloTarjeta as keyof typeof tarjetaValores] || 0}
				aria-label={ariaLabel}
				disabled
			/>
		</article>
	);
};

export default Ventas;