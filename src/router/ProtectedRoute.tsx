import { useAuthentication } from '../firebase/Firebase'
import { Navigate } from 'react-router-dom'
import React from 'react'

interface ProtectedProps {
  element: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedProps> = ({
  element,
}: ProtectedProps) => {
  const { isLogin } = useAuthentication()

  if (!isLogin) {
    return <Navigate to="/login" replace />
  }

  return <>{element}</>
}

export { ProtectedRoute }
