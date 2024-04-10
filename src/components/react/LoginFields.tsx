import { useEffect, useState } from "react";
import { obtenerUsuario } from "../../functions/app.ts";
import { postData } from "../../functions/peticiones.ts";

export default function LoginFields() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const usuario = obtenerUsuario()

  useEffect(() => {
    if (formSubmitted && username !== null && password !== null) {
      console.log(`{ username: ${username}, password: ${password} }`);
      fetchToken();
    }
  }, [formSubmitted, username, password]);

  async function fetchToken() {
    try {
      const token = await postData<string>(
        'api/public/token/tokencreado', {
          username,
          password,
        }
      )
      localStorage.setItem('token', token)
      handleToken()
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  }

  const handleToken = () => {
    const rol = usuario.nombre_rol.toLowerCase();
    console.log(`{ usuario: ${usuario.username}, rol: ${rol} }`);

    const roleUrlMap: { [key: string]: string } = {
      administrador: "/astro-frontend/dashboard/administrador",
      cajero: "/astro-frontend/dashboard/cajero/facturas",
    };

    if (roleUrlMap[rol]) {
      window.location.href = roleUrlMap[rol];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    setFormSubmitted(true);
  };

  const handleShowPassword = () => {
    const passwordField = document.querySelector('#passwordField') as HTMLInputElement
    const eyeToogle = document.querySelector('#Eye') as HTMLImageElement
    if (passwordField.type === 'password') {
      eyeToogle.src = '/astro-frontend/openEye.svg'
      passwordField.type = 'text'
    } else {
      eyeToogle.src = '/astro-frontend/closeEye.svg'
      passwordField.type = 'password'
    }
  }
  return (
    <>
      <section className="flex flex-col gap-4">
        {/* --------------------------- */}
        <label htmlFor="userField" className="pl-5">Usuario</label>
        <input
          id="userField"
          onChange={(event) => setUsername(event.target.value)} 
          className="p-3 text-black rounded-md focus:outline-none focus:placeholder-transparent"
          placeholder="Nobre de Usuario" type="text" value={username} required />
        {/* --------------------------- */}
        <label htmlFor="passwordField" className="pl-5">Contraseña</label>
        <section className="relative flex flex-row">
          <input
            id="passwordField"
            onChange={(event) => setPassword(event.target.value)} 
            className="w-full pt-3 pb-3 pl-3 pr-8 text-black rounded-md focus:outline-none focus:placeholder-transparent"
            placeholder="*********" type="password" value={password} required />
          <img
            onClick={handleShowPassword}
            className="absolute right-0 py-3 mr-3 cursor-pointer" 
            src="/astro-frontend/closeEye.svg" width={24} height={24} alt="Eye" id="Eye" />
        </section>
        {/* --------------------------- */}
        <button className="bg-secondary-color pt-2 pb-2 rounded-md" type="submit" onClick={handleSubmit}>
          Iniciar Sesion
        </button>
      </section>
    </>
  );
}
