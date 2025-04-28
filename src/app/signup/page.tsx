/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import './page.css'




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
    <div className="container">
      <div className="inner-container">
        <img
          alt="Your Company"
          className="logo"
        />
        <h2 className="title">
          Sign in to your account
        </h2>
      </div>

      <div className="form-container">
        <form action="#" method="POST" className="form">
          <div>
            <label htmlFor="email" className="label">
              Email address
            </label>
            <div className="input-group">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input"
              />
            </div>
          </div>

          <div>
            <div className="password-options">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="input-group">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="input"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="button">
              Sign in
            </button>
          </div>
        </form>

        <p className="footer-text">
          Not a member?{' '}
          <a href="#">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>

  )
}