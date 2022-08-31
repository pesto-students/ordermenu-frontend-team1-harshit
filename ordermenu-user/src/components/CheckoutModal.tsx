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

const CheckoutModal = () => {
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
                        <Image src={'https://picsum.photos/200'} width={useBreakpointValue({ base: '4rem', md: '5rem' })} alt={''} borderRadius={'50%'} />
                        <Box>
                            <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>Cafe Milano</Text>
                            <Text fontSize="sm" color='gray.500'>935 Addison Street, Berkeley, CA 94704, USA</Text>
                        </Box>
                    </Flex>
                    <Divider my={4} />
                    <Flex flexDirection="column" gap={2}>
                        <Box>
                            <Flex justify='space-between'>
                                <Text fontWeight='semibold' noOfLines={1}>
                                    Bagel With Smoked Salmon Bagel With
                                </Text>
                                <Text fontWeight='semibold' width='20%' textAlign='right'>
                                    ₹ 420
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" color='gray.500' noOfLines={1}>
                                    Medium
                                </Text>
                                <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                                    ₹ 40
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" color='gray.500' noOfLines={1}>
                                    Almond Milk
                                </Text>
                                <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                                    ₹ 40
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" fontWeight="semibold" color='gray.500' noOfLines={1}>
                                    Quantity
                                </Text>
                                <Text fontSize="xs" fontWeight="semibold" color='gray.500' width='20%' textAlign='right'>
                                    X 1
                                </Text>
                            </Flex>
                        </Box>

                        <Box>
                            <Flex justify='space-between'>
                                <Text fontWeight='semibold' noOfLines={1}>
                                    Red Velvet Shakes
                                </Text>
                                <Text fontWeight='semibold' width='20%' textAlign='right'>
                                    ₹ 420
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" color='gray.500' noOfLines={1}>
                                    Medium
                                </Text>
                                <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                                    ₹ 40
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" color='gray.500' noOfLines={1}>
                                    Almond Milk
                                </Text>
                                <Text fontSize="xs" color='gray.500' width='20%' textAlign='right'>
                                    ₹ 40
                                </Text>
                            </Flex>
                            <Flex justify='space-between' mt={1}>
                                <Text fontSize="xs" fontWeight="semibold" color='gray.500' noOfLines={1}>
                                    Quantity
                                </Text>
                                <Text fontSize="xs" fontWeight="semibold" color='gray.500' width='20%' textAlign='right'>
                                    X 2
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Divider my={4} />
                    <Flex justify='space-between'>
                        <Text fontWeight='semibold'>
                            Subtotal
                        </Text>
                        <Text fontWeight='semibold' width='20%' textAlign='right'>
                            ₹ 1500
                        </Text>
                    </Flex>
                    <Button width='100%' mt={4} colorScheme='brand'>Checkout</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default CheckoutModal