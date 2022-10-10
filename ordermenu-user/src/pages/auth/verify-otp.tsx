import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex, Text, useBreakpointValue, useColorModeValue, Button, HStack, PinInput, PinInputField } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";

import { signin, verifyOtp } from '../../apis/';
import { selectIsAuthenticated, setAuthState } from '../../store/authSlice';
import { Meta } from '../../components';

const VerifyOtp = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
    const dispatch = useDispatch()
    const [otp, setOtp] = useState<number>(123456);
    const isAuthenticated = useSelector(selectIsAuthenticated)

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/")
        }
    }, [router, isAuthenticated])

    const signinMutation = useMutation(signin, {
        onError: () => {
        },
        onSettled: () => {
            queryClient.invalidateQueries('create')
        }
    });

    const verifyOtpMutation = useMutation(verifyOtp, {
        onSuccess: (data: any) => {
            dispatch(setAuthState(true))
            router.push({
                pathname: "/"
            })
        },
        onError: () => {
        },
        onSettled: () => {
            queryClient.invalidateQueries('create')
        }
    });

    if (typeof window !== 'undefined') {
        var phone = Number(localStorage?.getItem('phone'))
        var userId = localStorage?.getItem('userId')
    }

    const resendOtp = () => {
        signinMutation.mutate({ phone })
    }

    const onSubmit = () => {
        verifyOtpMutation.mutate({ otp, userId })
    }

    return (
        <>
            <Meta title="Verify Otp" description="Verify your account | OrderMenu" url="https://ordermenu.live/auth/verify-otp" />
            <Flex height="90vh" justify="center" align="center">
                <Box bg={useColorModeValue('white', 'gray.800')} m={4} width={useBreakpointValue({ base: '100%', md: '24rem' })} p={useBreakpointValue({ base: 4, md: 8 })} borderRadius={8} shadow="sm">
                    <Text fontSize="lg" fontWeight="semibold">Have you received a verification code?
                    </Text>
                    <Text fontSize="xs" color="gray.500">We've sent you a verification code to your phone - {phone} <Button variant='ghost' size="xs" colorScheme='brand' onClick={resendOtp}>Resend</Button></Text>
                    <HStack my={4}>
                        <PinInput type='number' onChange={e => setOtp(Number(e))} mask defaultValue='123456'>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>

                    <Button colorScheme='brand' disabled={String(otp).length !== 6} width="100%" onClick={onSubmit}>Submit</Button>
                </Box>
            </Flex >
        </>
    )
}

export default VerifyOtp