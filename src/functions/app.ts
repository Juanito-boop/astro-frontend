import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import type { JsonUser } from '../Json';

export function LogOut() {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}

export function DecodeToken( token: string ): JsonUser | null {
  try {
    const decodedToken = jwtDecode( token ) as JsonUser;
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function obtenerFecha() {
  const dateObj = new Date()
  const year = dateObj.getFullYear()
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
  const day = ('0' + dateObj.getDate()).slice(-2)
  return `${year}/${month}/${day}`
}

export function obtenerUsuario() {
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const getToken = () => {
      if (typeof window !== 'undefined') {
        setToken(window.localStorage.getItem('token') || '')
      }
    }

    getToken();
  }, [])
  if (token) {
    const decodedToken = jwtDecode<JsonUser>(token);
    const { nombre_rol, username, id_tienda, iat, exp } = decodedToken;
    return { nombre_rol, username, id_tienda, iat, exp };
  } else {
    return {
      nombre_rol: '',
      username: '',
      id_tienda: 0,
      iat: 0,
      exp: 0,
    };
  }
}