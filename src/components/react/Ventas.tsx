import React, { useEffect, useState } from "react";
import { obtenerFecha, obtenerUsuario } from "../../functions/app.ts";
import { getData } from "../../functions/peticiones.ts";

interface VentasProps {
  tituloTarjeta: string;
  ariaLabel?: string;
}

const Ventas: React.FC<VentasProps> = ({ tituloTarjeta, ariaLabel }) => {
  const [cantidadFacturasAnuales, setCantidadFacturasAnuales] = useState<number>(0)
  const [cantidadFacturasMensuales, setCantidadFacturasMensuales] = useState<number>(0)
  const [cantidadFacturasDiarias, setCantidadFacturasDiarias] = useState<number>(0)
  const usuario = obtenerUsuario()

  const fetchFacturasYear = async (year: number, id_tienda: number) => {
    return await getData(
      'api/public/facturas/listarA', 
      {
        year: year,
        tienda: id_tienda,
      }
    )
  }

  const fetchFacturasMonth = async (month: number, id_tienda: number) => {
    return await getData(
      'api/public/facturas/listarMes'
      , {
        month: month,
        tienda: id_tienda,
      }
    )
  }

  const fetchFacturasDay = async (fecha: string, id_tienda: number) => {
    return await getData(
      'api/public/facturas/listarDia'
      , {
        day: fecha,
        tienda: id_tienda,
      }
    )
  }

  useEffect(() => {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1

    const fetchData = async () => {
      const dataYear = await fetchFacturasYear(year, usuario.id_tienda ?? 0)
      const dataMonth = await fetchFacturasMonth(month, usuario.id_tienda ?? 0)
      const dataDay = await fetchFacturasDay(obtenerFecha(), usuario.id_tienda ?? 0)
      
      setCantidadFacturasAnuales(dataYear.length)
      setCantidadFacturasMensuales(dataMonth.length)
      setCantidadFacturasDiarias(dataDay.length)
    }

    // fetchData()
  }, [])

  return (
    <>
      <article>
        <div className="rounded-t-md bg-[#FF6861] text-center py-2 px-5">{tituloTarjeta}</div>
        <input
          type="text"
          className="bg-[#E9E0E0] rounded-b-md p-5 text-center"
          value={tituloTarjeta === "Ventas anuales" ? cantidadFacturasAnuales : tituloTarjeta === "Ventas mensuales" ? cantidadFacturasMensuales : tituloTarjeta === "Ventas diarias" ? cantidadFacturasDiarias : 0}
          aria-label={ariaLabel}
          disabled
        />
      </article>
    </>
  );
}

export default Ventas;