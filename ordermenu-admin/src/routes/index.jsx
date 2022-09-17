import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'
import io from 'socket.io-client';

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
import { selectPartner } from "../store/partnerSlice"
import { addNewOrder } from "../store/orderSlice";
import { notification } from "../App";

const socket = io('wss://api.ordermenu.store', {
  reconnectionDelayMax: 10000
})

const BaseRoutes = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { partner } = useSelector(selectPartner)

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      dispatch(setIsAuthenticated(true))
    }
  }, [dispatch])

  useEffect(() => {
    if (partner?._id) {
      console.log("useEffect 2")
      socket.emit('join_channel', partner?._id)

      socket.on('new_order', ({ order }) => {
        console.log("new Order => ", order)
        dispatch(addNewOrder(order))
        notification({
          title: `${order?.user?.name} ordered!`,
          description: `${order?.products?.map(product => `${product.name},`)}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      });
    }

  }, [partner?._id, dispatch]);

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
