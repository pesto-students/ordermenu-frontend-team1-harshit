import React from 'react'
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
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useSelector } from "react-redux";

import { selectProducts } from 'src/store/cartSlice'
import { selectPartner } from 'src/store/partnerSlice'
import { CartProductCard } from '.';

const CheckoutModal = () => {
    const partner = useSelector(selectPartner)
    const products = useSelector(selectProducts)
    const calculateTotal = (products) => {
        let total = 0;

        products.map((product) => { total += (product?.price + (product?.size?.price || 0) + (product?.extra?.price || 0)) * product?.quantity; })

        return total
    }

    return (
        <Popover placement='bottom-end'>
            <PopoverTrigger>
                <Button
                    fontSize={'md'}
                    fontWeight={600}
                    variant={'ghost'}
                    colorScheme={'gray'}
                >
                    <FiShoppingCart />
                </Button>
            </PopoverTrigger>
            <PopoverContent p={2} width={useBreakpointValue({ base: '90vw', md: '28rem' })}>
                <PopoverCloseButton />
                <PopoverBody>
                    <Flex gap={4} align="center">
                        <Image src={partner?.logo} width={useBreakpointValue({ base: '4rem', md: '5rem' })} height={useBreakpointValue({ base: '4rem', md: '5rem' })} alt={partner?.name} borderRadius={'50%'} />
                        <Box>
                            <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>{partner?.name}</Text>
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

                    <Button width='100%' mt={4} colorScheme='brand'>Checkout</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CheckoutModal