import React from "react"
import { Routes, Route } from "react-router-dom"
import SidebarWithHeader from "../features/common/SidebarWithHeader/SidebarWithHeader"

import {
  DashboardPage,
  CategoriesPage,
  ProductsPage,
  OrdersPage,
  RestaurantDetailsPage,
  TablesPage,
} from "../features/index"
import Login from "../features/login/Login"
import Register from "../features/register/Register"
import ProtectedRoute from "../utils/ProtectedRoute"
import config from "../config"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"

const BaseRoutes = () => {
  const { setAuthState } = useAuth()

  useEffect(() => {
    isUserLoggedIn()
  }, [])

  async function isUserLoggedIn() {
    try {
      const { data, status } = await axios.get(
        `${config.URL}/api/v1/users/${localStorage.getItem("id")}`,
        {},
        { withCredentials: true }
      )
      if (status === 200) {
        setAuthState({ type: "LOGIN", payload: data._id })
        setAuthState({ type: "USERDATA", payload: data })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<SidebarWithHeader />}>
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
      </Route>
    </Routes>
  )
}

export default BaseRoutes
