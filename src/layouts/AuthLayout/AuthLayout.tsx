import { Container, Stack } from 'react-bootstrap'
import './AuthLayout.css'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

type AuthLayoutProps = {
  logo: string
}

function AuthLayout({ logo }: AuthLayoutProps) {
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState("")

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/auth/login") {
      setLabel("SIGN IN")
      setDescription("Enter your credentials to access your account")
    } else if (location.pathname === "/auth/register") {
      setLabel("SIGN UP")
      setDescription("Fill in the following fields to create an account.")
    }
  }, [location.pathname])

  return (
    <Container fluid className="auth-layout vh-100 d-flex justify-content-center align-items-center">
      <div className="auth-form bg-white rounded-4 shadow">
        <Stack className="auth-content">
          <img src={logo} alt="Logo" className="mx-auto" />
          <Stack className="text-center">
            <h3 className="auth-label fw-semibold text-dark">{label}</h3>
            <p className="auth-desc fs-14 color-gray-01">{description}</p>
          </Stack>
        </Stack>
        <Outlet />
      </div>
    </Container>
  )
}

export default AuthLayout
