"use client"
import { useRouter } from "next/navigation"
import { useContext } from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from '../../context/AuthContext'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  })

  const auth = useContext(AuthContext)
  const router = useRouter()
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const success = await auth?.signin(data.email, data.password)
    if (success) {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input {...register("email")} placeholder="E-mail" className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        
        <input type="password" {...register("password")} placeholder="Senha" className="input mt-2" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        <button type="submit" className="btn-primary mt-4">Entrar</button>
      </form>
    </div>
  )
}