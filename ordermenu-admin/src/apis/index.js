import { notification } from '../App'
import instance from './instance'

export const signin = async (phone) => {
  const response = await instance.post('/signin/admin', phone)
  return response
}

export const signup = async (partner) => {
  const response = await instance.post('/partners', partner)
  return response
}

export const verifyOtp = async (user) => {
  const response = await instance.post('/verify-otp', user)

  notification({
    title: "You have successfully sign in.",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const uploadFile = async (file) => {
  const data = new FormData();
  data.append("image", file);

  const response = await instance.post('/upload', data, { headers: { 'Content-Type': "multipart/form-data" } })
  notification({
    title: "Image successfully uploaded",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}


export const getPartnerDetails = async () => {
  const response = await instance.get('/partner')
  return response
}

export const getUserDetails = async () => {
  const response = await instance.get(`/user`)
  return response
}

export const updatePartnerDetails = async (partnerId, partner) => {
  const response = await instance.patch(`/partners/${partnerId}`, partner)
  notification({
    title: "Successfully updated partner details!",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const getAllCategories = async () => {
  const response = await instance.get('/categories')
  return response
}

export const addCategory = async (category) => {
  const response = await instance.post('/categories', category)
  notification({
    title: "Cateogry added successfully!",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const updateCategory = async (categoryId, category) => {
  const response = await instance.patch(`/categories/${categoryId}`, category)

  notification({
    title: "Cateogry updated successfully!",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const getAllProducts = async () => {
  const response = await instance.get('/products')
  return response
}

export const addProduct = async (product) => {
  const response = await instance.post('/products', product)
  notification({
    title: "Product added successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const updateProduct = async (productId, product) => {
  const response = await instance.patch(`/products/${productId}`, product)

  notification({
    title: "Product update successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const deleteProduct = async (productId) => {
  const response = await instance.delete(`/products/${productId}`)

  notification({
    title: "Product deleted successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const getAllTables = async () => {
  const response = await instance.get('/tables')
  return response
}

export const addTable = async (table) => {
  const response = await instance.post('/tables', table)

  notification({
    title: "Table added successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const deleteTable = async (productId) => {
  const response = await instance.delete(`/tables/${productId}`)

  notification({
    title: "Table deleted successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const getAllOrders = async (partnerId, sortBy = '-createdAt', limit = '10', page = '1', status) => {
  const response = await instance.get(`/orders/partners/${partnerId}?${status && `status=${status}`}&sortBy=${sortBy}&limit=${limit}&page=${page}`)
  return response
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await instance.patch(`/orders/${orderId}/${status}`)

  notification({
    title: "Updated order successfully",
    status: 'success',
    duration: 5000,
    isClosable: true,
  })
  return response
}

export const getOrderStats = async (partnerId) => {
  const response = await instance.get(`/orders/stats/${partnerId}`)
  return response
}