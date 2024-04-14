import { jwtDecode } from 'jwt-decode';
import { type JsonUser } from "#Json"

document.addEventListener('DOMContentLoaded', () => { 
  const token = localStorage.getItem('token');
  // console.log('Token:', token); // Imprime el token

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token) as JsonUser;
      const rol = user.nombre_rol.toLowerCase();
      const roleUrlMap: { [key: string]: string } = {
        administrador: "/astro-frontend/dashboard/administrador",
        cajero: "/astro-frontend/dashboard/cajero/facturas",
      };
  
      if (roleUrlMap[rol]) {
        window.location.href = roleUrlMap[rol];
      }
      console.log('User:', user); // Imprime el usuario decodificado
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }
})