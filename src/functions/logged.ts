import { DecodeToken } from "./app";

const roleUrlMap: Record<string, string> = {
  administrador: "/astro-frontend/dashboard/administrador",
  cajero: "/astro-frontend/dashboard/cajero/facturas",
};

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found");
    return;
  }

  const user = DecodeToken(token);

  if (user) {
    const rol = user.nombre_rol.toLowerCase();
    if (roleUrlMap[rol]) {
      window.location.href = roleUrlMap[rol];
    }
    console.log("User:", user);
  }
});