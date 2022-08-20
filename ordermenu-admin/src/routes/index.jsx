import React from 'react'
import { Routes, Route } from "react-router-dom";

import { DashboardPage, CategoriesPage, ProductsPage, OrdersPage, RestaurantDetailsPage, SettingsPage } from '../features/index'

const BaseRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/menu/categories" element={<CategoriesPage />} />
      <Route path="/menu/food-drinks" element={<ProductsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/restaurant-details" element={<RestaurantDetailsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default BaseRoutes