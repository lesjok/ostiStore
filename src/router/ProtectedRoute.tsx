import { useAuthentication } from '../firebase/FirebaseAuth'
import { Navigate } from 'react-router-dom'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLogin, isLoading } = useAuthentication()

  if (!isLogin && isLoading) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export { ProtectedRoute }
