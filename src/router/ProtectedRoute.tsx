import { useAuthentication } from '../firebase/FirebaseAuth'
import { Navigate } from 'react-router-dom'
import React from 'react'

interface ProtectedProps {
  children: React.ReactNode
}
const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { isLogin } = useAuthentication()

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export { ProtectedRoute }
