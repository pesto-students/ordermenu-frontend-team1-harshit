import instance from './instance'

export const signin = async (phone) => {
  const response = await instance.post('/signin', phone)
  return response
}

export const signup = async (user) => {
  const response = await instance.post('/signin', user)
  return response
}

export const verifyOtp = async (user) => {
  const response = await instance.post('/verify-otp', user)
  return response
}

export const uploadFile = async (file) => {
  const data = new FormData();
  data.append("image", file);

  const response = await instance.post('/upload', data, { headers: { 'Content-Type': "multipart/form-data" } })
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
  return response
}

export const getAllCategories = async () => {
  const response = await instance.get('/categories')
  return response
}

export const addCategory = async (category) => {
  const response = await instance.post('/categories', category)
  return response
}

export const updateCategory = async (categoryId, category) => {
  const response = await instance.patch(`/categories/${categoryId}`, category)
  return response
}

export const getAllProducts = async () => {
  const response = await instance.get('/products')
  return response
}

export const addProduct = async (product) => {
  const response = await instance.post('/products', product)
  return response
}

export const updateProduct = async (productId, product) => {
  const response = await instance.patch(`/products/${productId}`, product)
  return response
}

export const deleteProduct = async (productId) => {
  const response = await instance.delete(`/products/${productId}`)
  return response
}

export const getAllTables = async () => {
  const response = await instance.get('/tables')
  return response
}

export const addTable = async (table) => {
  const response = await instance.post('/tables', table)
  return response
}

export const deleteTable = async (productId) => {
  const response = await instance.delete(`/tables/${productId}`)
  return response
}

export const getAllOrders = async (partnerId) => {
  const response = await instance.get(`/orders/partners/${partnerId}`)
  return response
}

export const getOrderStats = async (partnerId) => {
  const response = await instance.get(`/orders/stats/${partnerId}`)
  return response
}