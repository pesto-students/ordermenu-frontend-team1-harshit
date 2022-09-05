import instance from './instance'

export const signin = async (body: { phone: number }) => {
    const response = await instance.post("/signin", body)
    return response
}

export const signup = async (body: { firstName: string, lastName: string, email: string, phone: number }) => {
    const response = await instance.post("/signup", body)
    return response
}

export const verifyOtp = async (body: { userId: string, otp: number }) => {
    const response = await instance.post("/verify-otp", body)
    return response
}

export const getPartnerBySlug = async (slug: string) => {
    const response = await instance.get(`/partners/${slug}`)
    return response
}

export const getPartners = async () => {
    const response = await instance.get(`/partners`)
    return response
}