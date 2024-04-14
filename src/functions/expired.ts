import { jwtDecode } from "jwt-decode";
import { type JsonUser } from "#Json";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  // console.log('Token:', token); // Imprime el token

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token) as JsonUser;
      // console.log('User:', user); // Imprime el usuario decodificado
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  if (user) {
    const currentTime = Date.now().valueOf() / 1000;
    // console.log('Current time:', currentTime); // Imprime el tiempo actual

    if (user.exp < currentTime) {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.innerHTML =
          "<p>El token ha expirado, por favor inicia sesión de nuevo.</p>";
      }
      window.location.href = "/astro-frontend/"; // Redirige al usuario a la página de inicio de sesión
    }
  } else {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML =
        "<p>No se encontró un token, por favor inicia sesión.</p>";
    }
    window.location.href = "/astro-frontend/"; // Redirige al usuario a la página de inicio de sesión
  }
});
