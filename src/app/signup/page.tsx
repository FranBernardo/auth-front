"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"



const signinSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema)
  })
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMensage, setErrorMensage] = useState("")

  const onSubmit = async (data: any) => {
    setLoading(true)
    setErrorMensage("")

    try {
      await axios.post("/signup", data)
      router.push("/login")
    } catch (error: any) {
      setErrorMensage(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='shadow-xl flex min-h-screen justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg w-96"
      >

        <h2 className='text-xl font-bold mb-4'> Criar Conta</h2>

        <input className='input w-full' type="text" placeholder='Nome' {...register("name")} />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        <input className="input w-full mt-2" type="email" placeholder='Email' {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <input className="input w-full mt-2" type="password" placeholder='Senha' {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <button className="btn btn-primary w-full mt-4" type="submit">Cadastrar</button>
      </form>
    </div>
  )
}