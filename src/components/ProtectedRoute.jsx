/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { UserAuth } from "../context/AuthContext"

export const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth()
  console.log(user)

  if (user) {
    return <Navigate to='/' replace />
  }

  return children
}

