import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { JsonUser } from "@/Json";
import UsersTable from "@/components/shadcn/usuarios/page";

export default function UsersPage(){
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [tienda, setTienda] = useState<number>(0);
  useEffect(() => {
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
                    className="p-3 text-black rounded-md focus:outline-none focus:placeholder-transparent"
                    id="userField"
                    name="user"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Nombre de Usuario"
                    required
                    type="text"
                    value={username}
                  />
                </div>
                <div className="flex flex-col shadow-2xl">
                  <label htmlFor="pass">Contraseña</label>
                  <div className="relative flex flex-row">
                    <input
                      className="w-full py-3 pl-3 text-black rounded-md pr-9 focus:outline-none focus:placeholder-transparent"
                      id="passwordField"
                      name="pass"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="********"
                      required
                      type="password"
                      value={password}
                    />
                    <img
                      onClick={handleShowPassword}
                      className="absolute right-0 py-3 mr-3 cursor-pointer" 
                      src="/astro-frontend/closeEye.svg" width={24} height={24} alt="Eye" id="Eye" />
                  </div>
                </div>
                <button
                  className="bg-[#3D3F51] py-2 rounded-md w-full"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Guardar
                </button>
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