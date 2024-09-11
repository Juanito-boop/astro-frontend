import { useEffect, useState } from "react";
import { obtenerUsuario } from "#functions/app";
import { postData } from "#functions/peticiones";

export default function LoginFields() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
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
        'api/v1/public/token/', {
          "username": username,
          "password": password,
        }
      )
      console.log(token)
      localStorage.setItem('token', token)
      handleToken()
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  }

  const handleToken = () => {
    console.log(usuario)
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
    handleToken();
    setFormSubmitted(true);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
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
          placeholder="*********" type={showPassword ? 'text' : 'password'} value={password} required />
        <button
          onClick={handleShowPassword}
          className="absolute right-0 py-3 mr-3 cursor-pointer bg-transparent border-none"
          type="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}>
          <img
            src={showPassword ? '/astro-frontend/openEye.svg' : '/astro-frontend/closeEye.svg'} width={24} height={24} alt="Eye" id="Eye" />
        </button>
      </section>
      {/* --------------------------- */}
      <button className="bg-secondary-color pt-2 pb-2 rounded-md" type="submit" onClick={handleSubmit}>
        Iniciar Sesion
      </button>
    </section>
  );
}
