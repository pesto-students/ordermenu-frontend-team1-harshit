import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth()

  if (!authState.userLoggedIn) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRoute
