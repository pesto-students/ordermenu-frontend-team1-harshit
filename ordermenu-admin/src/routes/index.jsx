import React from "react"
import { Routes, Route } from "react-router-dom"
import SidebarWithHeader from "../features/common/SidebarWithHeader/SidebarWithHeader"

import {
  DashboardPage,
  CategoriesPage,
  ProductsPage,
  OrdersPage,
  RestaurantDetailsPage,
  SettingsPage,
} from "../features/index"
import Login from "../features/login/Login"
import Register from "../features/register/Register"

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<SidebarWithHeader />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/menu/categories" element={<CategoriesPage />} />
        <Route path="/menu/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/restaurant-details" element={<RestaurantDetailsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default BaseRoutes
