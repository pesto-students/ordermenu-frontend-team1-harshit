import * as yup from 'yup'
import "yup-phone";

export const signinSchema = yup.object().shape({
    phone: yup.string().phone().required()
})

export const signupSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().phone().required(),
    email: yup.string().email().required()
})