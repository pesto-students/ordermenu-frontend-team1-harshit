import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'

import SidebarWithHeader from "../features/common/SidebarWithHeader/SidebarWithHeader"
import {
  DashboardPage,
  CategoriesPage,
  ProductsPage,
  OrdersPage,
  RestaurantDetailsPage,
  TablesPage,
} from "../features/index"
import Login from "../features/auth/Login"
import Register from "../features/auth/Register"
import ProtectedRoute from "../utils/ProtectedRoute"
import VerifyOtpPage from "../features/auth/VerifyOtpPage"
import { selectIsAuthenticated, setIsAuthenticated } from "../store/authSlice"

const BaseRoutes = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      dispatch(setIsAuthenticated(true))
    }
  }, [dispatch])

  return (
    <Routes>
      {
        !isAuthenticated ? <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </> : <Route element={<SidebarWithHeader />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/menu/food-drinks"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tables"
            element={
              <ProtectedRoute>
                <TablesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant-details"
            element={
              <ProtectedRoute>
                <RestaurantDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Route>
      }
    </Routes>
  )
}

export default BaseRoutes
