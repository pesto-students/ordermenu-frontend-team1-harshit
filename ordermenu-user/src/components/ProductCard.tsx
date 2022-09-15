import React from 'react'
import { Box, Flex, Image, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'

import { AddProductModal } from './'

const ProductCard = ({ product }) => {
    return (
        <Flex p={4} gap={4}>
            <Image src={product?.image} width={useBreakpointValue({ base: '8rem', md: '10rem' })} minWidth={useBreakpointValue({ base: '8rem', md: '10rem' })} height={useBreakpointValue({ base: '8rem', md: '10rem' })} minHeight={useBreakpointValue({ base: '8rem', md: '10rem' })}  alt={product?.name} borderRadius={8} />

            <Flex flexDirection='column' justify='space-between' align='end' width="100%">
                <Box width="100%">
                    <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')} noOfLines={2}>{product?.name}</Text>
                    <Text fontSize="sm" color='gray.500' noOfLines={2}>{product?.description}</Text>
                    <Text fontSize="sm" fontWeight='semibold' color='gray.500' mt={2}>₹ {product?.price}</Text>
                </Box>
                <Box>
                    <AddProductModal product={product} />
                </Box>
            </Flex>
        </Flex >
    )
}

export default ProductCard