import React, { useCallback, useEffect, useState } from 'react'
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import {
    Button,
    Flex,
    Image,
    useBreakpointValue,
    Box,
    Text,
    useColorModeValue,
    Divider,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

import { resetCart, selectProducts, selectTableId } from '../store/cartSlice'
import { selectPartner } from '../store/partnerSlice'
import { CartProductCard, Meta } from '../components/';
import { selectIsAuthenticated } from '../store/authSlice';
import { createCheckoutOrder, createOrder } from '../apis';

const Checkout = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const Razorpay = useRazorpay();
    const partner = useSelector(selectPartner)
    const products = useSelector(selectProducts)
    const tableId = useSelector(selectTableId)
    const [paymentSuccess, setPaymentSuccess] = useState(null);
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const calculateTotal = (products) => {
        let total = 0;
        products.map((product) => { total += (product?.price + (product?.size?.price || 0) + (product?.extra?.price || 0)) * product?.quantity; })
        return total
    }

    const orderedProduct = useCallback(() => {
        return products.map((p: any) => {
            const productInfo: any = {}
            productInfo.id = p?._id;
            productInfo.quantity = p?.quantity;
            if (p?.extra?._id) productInfo.extra = p?.extra?._id;
            if (p?.size?._id) productInfo.size = p?.size?._id;
            return productInfo
        })
    }, [products])


    const handlePayment = useCallback(async () => {
        const order: any = await createCheckoutOrder({
            partnerId: partner?._id,
            tableId: tableId,
            products: orderedProduct()
        });

        const options: RazorpayOptions = {
            key: "rzp_test_uRJsBlxJhmJR21",
            amount: order?.amount,
            currency: order?.currency,
            name: partner?.name,
            description: partner?.name,
            image: partner?.image,
            order_id: order?.id,
            handler: async (res) => {
                const response = await createOrder({
                    partnerId: partner?._id,
                    tableId: tableId,
                    products: orderedProduct(),
                    paymentInfo: res
                })
                setPaymentSuccess(response)
                dispatch(resetCart({}))
            },
            notes: {
                name: partner?.name
            },
            theme: {
                color: "#34d399",
            },
        };

        const rzpay = new Razorpay(options);
        rzpay.open();
    }, [Razorpay, partner?._id, orderedProduct, tableId, partner?.name, partner?.image, dispatch]);


    useEffect(() => {
        if (products.length === 0) {
            const slug = sessionStorage.getItem("restaurantSlug")
            const tableNumber = sessionStorage.getItem("tableNumber")

            if (slug) {
                router.push(`/restaurant/${slug}?tableNumber=${tableNumber}`)
            } else {
                router.push(`/`)
            }
        }
    }, [router, products])

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])

    const color = useColorModeValue('gray.800', 'white')
    const imageSize = useBreakpointValue({ base: '4rem', md: '5rem' })

    return (
        <>
            <Meta title="Checkout" />

            <Flex justify="center" mt={{ base: 2, md: 4, lg: 8 }}>
                <Box width={{ base: '100%', md: "60%", lg: '40%' }} bg={useColorModeValue('white', 'gray.800')} p={{ base: 4, md: 8 }} m={4} borderRadius={8}>
                    {paymentSuccess ? <Flex justify="center" align="center" flexDirection={'column'}>
                        <Image src="/assets/success.svg" alt="successfully make an order." width={{ base: '100%', md: '20rem' }} />
                        <Text color={color} fontSize="xl" fontWeight="semibold" mt={8}>Yay! Your order has been confirmed.</Text>
                        <Button colorScheme="brand" variant="outline" mt={4} onClick={() => router.push(`/restaurant/${sessionStorage.getItem("restaurantSlug")}?tableNumber=${sessionStorage.getItem("tableNumber")}`)}>Want to order more?</Button>
                    </Flex> : <>
                        <Flex gap={4} align="center">
                            <Image src={partner?.logo} width={imageSize} height={imageSize} alt={partner?.name} borderRadius={'50%'} />
                            <Box>
                                <Text fontSize="lg" fontWeight="semibold" color={color}>{partner?.name}</Text>
                                <Text fontSize="sm" color='gray.500'>{partner?.address}</Text>
                            </Box>
                        </Flex>
                        <Divider my={4} />

                        {
                            products?.length > 0 ? <><Flex flexDirection="column" gap={2}>

                                {
                                    products?.map((product) => <CartProductCard key={product?._id} product={product} />)
                                }
                            </Flex>
                                <Divider my={4} />
                                <Flex justify='space-between'>
                                    <Text fontWeight='semibold'>
                                        Subtotal
                                    </Text>
                                    <Text fontWeight='semibold' width='20%' textAlign='right'>
                                        ₹ {calculateTotal(products)}
                                    </Text>
                                </Flex></> : <Flex><Text>Your cart is empty.</Text></Flex>
                        }

                        <Button width='100%' mt={4} colorScheme='brand' onClick={() => {
                            if (isAuthenticated) {
                                handlePayment()
                            } else {
                                router.push('/auth/signin')
                            }
                        }}>Checkout</Button>
                    </>}
                </Box>
            </Flex>
        </>
    )
}

export default Checkout