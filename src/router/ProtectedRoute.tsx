import { useAuthentication } from '../firebase/FirebaseAuth'
import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

interface Props {
  children: React.ReactNode
}
const ProtectedRoute = ({ children }: Props) => {
  const { isLogin } = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogin) {
      const timeoutId = setTimeout(() => {
        navigate('/login')
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [isLogin, navigate])

  return <>{children}</>
}

export { ProtectedRoute }
