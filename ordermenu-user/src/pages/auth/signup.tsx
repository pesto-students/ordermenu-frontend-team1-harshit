import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, FormControl, FormLabel, Text, useBreakpointValue, useColorModeValue, Button, Input, FormErrorMessage } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query';
import { Formik, Form, Field } from 'formik'
import { useSelector } from "react-redux";

import { signup } from '../../apis/'
import { signupSchema } from '../../validations';
import { selectIsAuthenticated } from '../../store/authSlice';
import { Meta } from '../../components';

const Signin = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    const isAuthenticated = useSelector(selectIsAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [router, isAuthenticated])

    const { mutate, isLoading } = useMutation(signup, {
        onSuccess: (data: any) => {
            localStorage.setItem("userId", data._id)
            localStorage.setItem("phone", data.phone)
            router.push({
                pathname: "/auth/verify-otp"
            })
        },
        onError: () => {
        },
        onSettled: () => {
            queryClient.invalidateQueries('create')
        }
    });

    const validatePhone = (phone) => {
        const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
        rePhoneNumber.test(phone)
    }


    return (
        <>
            <Meta title="Sign up" description="Create your account to order food | OrderMenu" url="https://ordermenu.live/auth/signup" />
            <Flex height="90vh" justify="center" align="center">
                <Box bg={useColorModeValue('white', 'gray.800')} m={4} width={useBreakpointValue({ base: '100%', md: '24rem' })} p={useBreakpointValue({ base: 4, md: 8 })} borderRadius={8} shadow="sm">
                    <Text fontSize="lg" fontWeight="semibold">Create an account</Text>
                    <Text fontSize="xs" color="gray.500">It's quick and easy</Text>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', phone: null }}
                        validationSchema={signupSchema}
                        onSubmit={(values, actions) => {
                            mutate(values)
                        }}
                    >

                        {(props) => (
                            <Form>
                                <Field name='firstName'>
                                    {({ field, form }) => (
                                        <FormControl my={4} isInvalid={form.errors.firstName && form.touched.firstName}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input {...field} placeholder="John" required />
                                            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='lastName'>
                                    {({ field, form }) => (
                                        <FormControl my={4} isInvalid={form.errors.lastName && form.touched.lastName}>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input {...field} placeholder="Doe" required />
                                            <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='phone' validate={validatePhone}>
                                    {({ field, form }) => (
                                        <FormControl my={4} isInvalid={form.errors.phone && form.touched.phone}>
                                            <FormLabel>Phone</FormLabel>
                                            <Input {...field} placeholder="1234567890" required />
                                            <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name='email'>
                                    {({ field, form }) => (
                                        <FormControl my={4} isInvalid={form.errors.email && form.touched.email}>
                                            <FormLabel>Email</FormLabel>
                                            <Input {...field} type="email" required placeholder="hello@johndoe.com" />
                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button colorScheme='brand' width="100%" isLoading={isLoading} disabled={!props.isValid} type='submit'>Proceed</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </>
    )
}

export default Signin