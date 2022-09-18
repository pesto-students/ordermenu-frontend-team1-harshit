import React, { useEffect, useCallback } from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Flex,
    Image,
    useBreakpointValue,
    Box,
    Text,
    useColorModeValue,
    Divider,
    Badge,
    useDisclosure,
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch, useSelector } from "react-redux";

import { resetCart, selectProducts, selectTableId } from '../store/cartSlice'
import { selectPartner } from '../store/partnerSlice'
import { CartProductCard } from '.';
import { useRouter } from 'next/router';
import { selectIsAuthenticated } from '../store/authSlice';

const CheckoutModal = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const tableId = useSelector(selectTableId)
    const partner = useSelector(selectPartner)
    const products = useSelector(selectProducts)
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const calculateTotal = (products) => {
        let total = 0;
        products.map((product) => { total += (product?.price + (product?.size?.price || 0) + (product?.extra?.price || 0)) * product?.quantity; })
        return total
    }

    const imageSize = useBreakpointValue({ base: '4rem', md: '5rem' })
    const color = useColorModeValue('gray.800', 'white')

    const setCart = useCallback((_slug, _products) => { localStorage.setItem(`${_slug}`, JSON.stringify(_products)) }, [partner?.slug, products])

    useEffect(() => {
        if (partner?.slug) {
            setCart(partner?.slug, products)
        }
    }, [partner?.slug, products, setCart])

    return (
        <Popover placement='bottom-end' isOpen={isOpen}>
            <PopoverTrigger>
                <Button
                    size='lg'
                    variant='link'
                    colorScheme='gray'
                    position="relative"
                    onClick={onOpen}
                >
                    <FiShoppingCart />
                    {products?.length > 0 && <Badge colorScheme='red' variant='solid' minW={5} minH={5} position="absolute" top={-0.5} right={0} borderRadius="100%" display='flex' justifyContent="center" alignItems="center">{products?.length}</Badge>}
                </Button>
            </PopoverTrigger>
            <PopoverContent p={2} ml={2} width={useBreakpointValue({ base: '90vw', md: '28rem' })}>
                <PopoverCloseButton onClick={onClose} />
                <PopoverBody>
                    {
                        partner?.name && <><Flex gap={4} align="center">
                            <Image src={partner?.logo} width={imageSize} height={imageSize} alt={partner?.name} borderRadius={'50%'} />
                            <Box>
                                <Text fontSize="lg" fontWeight="semibold" color={color}>{partner?.name}</Text>
                                <Text fontSize="sm" color='gray.500'>{partner?.address}</Text>
                            </Box>
                        </Flex>
                            <Divider my={4} />
                        </>}

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
                            </Flex></> : <Flex my={4}><Text>Your cart is empty.</Text></Flex>
                    }

                    <Flex gap={4}>
                        <Button width='100%' mt={4} onClick={() => {
                            localStorage.removeItem(`${partner?.slug}`)
                            dispatch(resetCart({}))
                            onClose()
                        }} disabled={products?.length === 0 || !tableId}>Clear Cart</Button>
                        <Button width='100%' mt={4} colorScheme='brand' onClick={() => {
                            if (isAuthenticated) {
                                router.push('/checkout')
                            } else {
                                router.push('/auth/signin')
                            }
                            onClose()
                        }} disabled={products?.length === 0 || !tableId}>Checkout</Button>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CheckoutModal