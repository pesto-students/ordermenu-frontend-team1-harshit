import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Flex,
    Box,
    Divider,
    Text,
    useColorModeValue,
    ModalHeader,
} from '@chakra-ui/react'
import ProductInfoCard from './ProductInfoCard'
import { useDispatch } from 'react-redux'
import { updateOrderStatusAction } from '../../../store/orderSlice'
import StatusRenderer from './StatusRenderer'


const OrderDetailsModal = ({ order, isOrderOpen, setIsOrderOpen }) => {
    const { isOpen, onClose } = useDisclosure({ isOpen: isOrderOpen, onOpen: () => setIsOrderOpen(true), onClose: () => setIsOrderOpen(false) })
    const dispatch = useDispatch()

    const calculateTotal = (products) => {
        let total = 0;
        products.forEach((product) => { total += (product?.price + (product?.size?.price || 0) + (product?.extra?.price || 0)) * product?.quantity; })
        return total
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="outside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Order Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex justify="center">
                            <Box width="100%" bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                                <>
                                    <Flex gap={4} align="center">
                                        <Box>
                                            <Flex gap={4} align="center">
                                                <Text fontSize="sm" fontWeight="semibold">Customer : </Text>
                                                <Text fontSize="sm">{order?.user?.name}</Text>
                                            </Flex>
                                            <Flex gap={4} align="center">
                                                <Text fontSize="sm" fontWeight="semibold">Phone : </Text>
                                                <Text fontSize="sm">{order?.user?.phone}</Text>
                                            </Flex>
                                            <Flex gap={4} align="center">
                                                <Text fontSize="sm" fontWeight="semibold">Email : </Text>
                                                <Text fontSize="sm">{order?.user?.email}</Text>
                                            </Flex>
                                            <Flex gap={4} align="center">
                                                <Text fontSize="sm" fontWeight="semibold">Ordered On : </Text>
                                                <Text fontSize="sm">{new Date(order?.createdAt).toLocaleDateString() + ', ' + new Date(order?.createdAt).toLocaleTimeString()}</Text>
                                            </Flex>
                                            <Flex gap={4} align="center" mt={2}>
                                                <Text fontSize="sm" fontWeight="semibold">Order Status : </Text>
                                                <StatusRenderer status={order?.status} />
                                            </Flex>
                                        </Box>
                                    </Flex>
                                    <Divider my={4} />

                                    <Flex flexDirection="column" gap={2}>

                                        {
                                            order?.products?.map((product) => <ProductInfoCard key={product?._id} product={product} />)
                                        }
                                    </Flex>
                                    <Divider my={4} />
                                    <Flex justify='space-between'>
                                        <Text fontWeight='semibold'>
                                            Subtotal
                                        </Text>
                                        <Text fontWeight='semibold' width='20%' textAlign='right'>
                                            ₹ {calculateTotal(order?.products)}
                                        </Text>
                                    </Flex>
                                </>
                            </Box>
                        </Flex>
                    </ModalBody>

                    <ModalFooter display={'flex'} gap={4}>
                        {
                            order?.status === "COMPLETED" ? '' : <Button colorScheme="red" variant="outline" onClick={() => dispatch(updateOrderStatusAction({ orderId: order?._id, status: "CANCELLED" }))}>Cancel</Button>
                        }
                        {
                            order?.status === "PENDING" ? <Button onClick={() => dispatch(updateOrderStatusAction({ orderId: order?._id, status: "ACCEPTED" }))} colorScheme={'green'}>Accept</Button> : order?.status === "ACCEPTED" ? <Button onClick={() => dispatch(updateOrderStatusAction({ orderId: order?._id, status: "COMPLETED" }))} colorScheme={'green'}>Complete</Button> : ""
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OrderDetailsModal