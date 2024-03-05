import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { JsonUser } from "@/Json";
import UsersTable from "@/components/shadcn/usuarios/page";
import { obtenerUsuario } from "@/functions/app";

export default function UsersPage(){
  const usuario = obtenerUsuario();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const tienda = usuario.id_tienda;
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const rowString = localStorage.getItem('selectedRow');
    if (typeof rowString === 'string' && rowString !== '') {
      try {
        const objetoRecuperado = JSON.parse(rowString) as JsonUser;
        console.log(objetoRecuperado);
        // Realizar acciones con objetoRecuperado
      } catch (error) {
        console.error('Error al analizar el JSON:', error);
        // Manejar el error, puede ser una cadena no válida JSON
      }
    } else {
      console.log('El valor recuperado no es una cadena de texto JSON válida.');
    }
    setIsLoading(false);
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      {isLoading ? (
        <div>
          <div className="text-2xl text-center text-[#3D3F51]">Cargando...</div>
        </div>
        ) : (
          <div className="grid justify-around grid-cols-2 gap-5 my-10">
            <div className="flex flex-col col-span-1 gap-4 px-10">
              <h1 className="text-[#3D3F51] text-2xl">Administrar Usuarios</h1>
              <form className="bg-[#FF6861] rounded-md p-4 gap-4 [&>div]:mb-3">
                <div className="flex flex-col shadow-2xl">
                  <label htmlFor="user">Usuario</label>
                  <input
                    id="userField"
                    onChange={(event) => setUsername(event.target.value)}
                    className="p-3 text-black rounded-md focus:outline-none focus:placeholder-transparent"
                    name="user" placeholder="Nombre de Usuario" type="text" value={username} required />
                </div>
                <div className="flex flex-col shadow-2xl">
                  <label htmlFor="pass">Contraseña</label>
                  <div className="relative flex flex-row">
                    <input
                      id="passwordField"
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full py-3 pl-3 text-black rounded-md pr-9 focus:outline-none focus:placeholder-transparent"
                      name="pass" placeholder="********" type="password" value={password} required />
                    <img
                      onClick={handleShowPassword} className="absolute right-0 py-3 mr-3 cursor-pointer" 
                      src="/astro-frontend/closeEye.svg" width={24} height={24} alt="Eye" id="Eye" />
                  </div>
                </div>
                <button className="bg-[#3D3F51] py-2 rounded-md w-full" onClick={handleSubmit} type="submit">Guardar</button>
              </form>
            </div>
            <div className="col-span-1">
              <UsersTable id_tienda={tienda} />
            </div>
          </div>
        )}
    </>
  )
}