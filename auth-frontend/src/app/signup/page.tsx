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
    <div className='flex min-h-screen justify-center items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-lg w-96"
      >

        <h2> Criar Conta</h2>
      </form>
    </div>
  )
}