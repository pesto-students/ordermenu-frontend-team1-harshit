import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, FormControl, FormLabel, Text, useBreakpointValue, useColorModeValue, Button, Input, FormErrorMessage } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query';
import { Formik, Form, Field } from 'formik'
import { useSelector } from "react-redux";

import { signin } from '../../apis/'
import { signinSchema } from '../../validations';
import { selectIsAuthenticated } from '../../store/authSlice';
import { Meta } from '../../components';
import Link from 'next/link';
import { notification } from '../_app';

const Signin = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    const isAuthenticated = useSelector(selectIsAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [router, isAuthenticated])

    const { mutate, isLoading } = useMutation(signin, {
        onSuccess: (data: any) => {
            localStorage.setItem("userId", data._id)
            localStorage.setItem("phone", data.phone)
            router.push({
                pathname: "/auth/verify-otp"
            })
        },
        onError: (err: any) => {
            if (err?.response?.status === 404) {
                notification({
                    title: "You don't have an account. Please create one.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('create')
        }
    });

    const validatePhone = (phone) => {
        const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
        if (!rePhoneNumber.test(phone)) {
            return "Please enter a valid phone number."
        }
    }


    return (
        <>
            <Meta title="Sign in" description="Singin into your account | OrderMenu" url="https://ordermenu.live/auth/signin" />
            <Flex height="90vh" justify="center" align="center">
                <Box bg={useColorModeValue('white', 'gray.800')} m={4} width={useBreakpointValue({ base: '100%', md: '24rem' })} p={useBreakpointValue({ base: 4, md: 8 })} borderRadius={8} shadow="sm">
                    <Text fontSize="lg" fontWeight="semibold">Welcome Back</Text>
                    <Text fontSize="xs" color="gray.500">It's quick and easy</Text>
                    <Formik
                        initialValues={{ phone: '' }}
                        validationSchema={signinSchema}
                        onSubmit={(values, actions) => {
                            mutate({ phone: (Number(values.phone)) })
                        }}
                    >

                        {(props) => (
                            <Form>
                                <Field name='phone' validate={validatePhone}>
                                    {({ field, form }) => (
                                        <FormControl my={4} isInvalid={form.errors.phone && form.touched.phone}>
                                            <FormLabel>Enter phone number</FormLabel>
                                            <Input {...field} placeholder="8989475132" />
                                            <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button colorScheme='brand' width="100%" isLoading={isLoading} disabled={!props.isValid} type='submit'>Proceed</Button>
                            </Form>
                        )}
                    </Formik>
                    <Flex justify="center" mt={4}>
                        <Link href="/auth/signup">
                            <Button variant='link' colorScheme="brand" _hover={{ textDecoration: 'none' }}>I don't have an account?</Button>
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Signin