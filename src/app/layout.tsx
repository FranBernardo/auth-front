import { AuthProvider } from '../context/AuthContext'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="pt">
        <body>{children}</body>
      </html>
    </AuthProvider>
  )
}
