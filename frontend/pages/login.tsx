import logoGoogle from "../assets/icon-google.svg";
import Image from "next/image";
import React, { useState } from "react";

interface inputState{
  user: string,
  password: string
}

const Login = () => {

  const [inputsState, setInputsState] = useState<inputState>({
    user:"",
    password:""
  })

  const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputsState((data) : inputState => {
      return{
        ...data,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleOnSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit} className="flex  bg-slate-700 flex-col p-10 text-white rounded-md">
        <span className="text-center text-3xl font-bold">Login</span>
        <p className="text-center mt-3">Bienvenido 👋🏻</p>
        <label className="mt-4 mb-1">Usuario</label>
        <input name="user" onChange={handleOnChangeInputs} value={inputsState.user} className="w-96 h-11 p-3  bg-transparent border-2 border-slate-500 rounded-md focus:border-2 focus:border-slate-300 focus:outline-none hover:bg-slate-800 transition" placeholder="Ingrese su usuario/email" type="text" />
        <label className="mt-4 mb-1">Contraseña</label>
        <input name="password" onChange={handleOnChangeInputs} value={inputsState.password} className="w-96 h-11 p-3  bg-transparent border-2 border-slate-500 rounded-md focus:border-2 focus:border-slate-300 focus:outline-none hover:bg-slate-800 transition" placeholder="Ingrese su contraseña" type="password" />
        <button className="w-96 h-11 p-3 mt-6 bg-slate-900 rounded-md hover:opacity-70 transition-all" type="submit">Login</button>
        <button className="w-96 h-11 p-3 mt-6 bg-slate-900 rounded-md hover:opacity-70 transition-all flex justify-center items-center" type="button"><Image width="25px" src={logoGoogle} alt="logoGoogle" /><span className="ml-2">Continuar con Google</span></button>
      </form>
    </div>
  );
};

export default Login;