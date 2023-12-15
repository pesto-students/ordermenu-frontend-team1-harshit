import {
    Flex,
    Box,
    Text,
} from '@chakra-ui/react'

const CartProductCard = ({ product }) => {
    return (
        <Box>
            <Flex justify='space-between'>
                <Text fontWeight='semibold' noOfLines={1}>
                    {product?.name}
                </Text>
                <Text fontWeight='semibold' width='20%' textAlign='right'>
                    ₹  {product?.price}
                </Text>
            </Flex>
            {
                product?.size && <Flex justify='space-between' mt={1}>
                    <Text fontSize="xs" color='gray.500' noOfLines={1}>
                        {product?.size?.name}
                    </Text>
                    <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                        ₹ {product?.size?.price}
                    </Text>
                </Flex>
            }
            {
                product?.extra && <Flex justify='space-between' mt={1}>
                    <Text fontSize="xs" color='gray.500' noOfLines={1}>
                        {product?.extra?.name}
                    </Text>
                    <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                        ₹ {product?.extra?.price}
                    </Text>
                </Flex>
            }

            <Flex justify='space-between' mt={1}>
                <Text fontSize="xs" fontWeight="semibold" color='gray.500' noOfLines={1}>
                    Quantity
                </Text>
                <Text fontSize="xs" fontWeight="semibold" color='gray.500' width='20%' textAlign='right'>
                    X {product?.quantity}
                </Text>
            </Flex>
        </Box>
    )
}

export default CartProductCard