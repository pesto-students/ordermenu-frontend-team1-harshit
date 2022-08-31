import React from 'react'
import { Box, Flex, Image, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { AddProductModal } from './'

const ProductCard = () => {
    return (
        <Flex p={4} gap={4}>
            <Image src={'https://picsum.photos/200'} width={useBreakpointValue({ base: '8rem', md: '10rem' })} alt={''} borderRadius={8} />

            <Flex flexDirection='column' justify='space-between' align='end' width="100%">
                <Box width="100%">
                    <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>Bagel With Smoked Salmon</Text>
                    <Text fontSize="sm" color='gray.500'>Bagel With Smoked Salmon</Text>
                    <Text fontSize="sm" fontWeight='semibold' color='gray.500' mt={2}>₹ 420</Text>
                </Box>
                <Box>
                    <AddProductModal />
                </Box>
            </Flex>
        </Flex >
    )
}

export default ProductCard