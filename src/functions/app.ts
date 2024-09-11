import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import type { JsonUser } from '../Json';

export function LogOut() {
	localStorage.removeItem('token');
	window.location.href = '/';
}

export function DecodeToken(token: string): JsonUser | null {
	try {
		return jwtDecode(token) as JsonUser;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
}

export function obtenerFecha() {
	const dateObj = new Date();
	return format(dateObj, 'yyyy/MM/dd');
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