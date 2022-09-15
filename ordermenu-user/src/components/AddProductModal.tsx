import React, { useEffect, useState } from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Flex,
    Image,
    useBreakpointValue,
    Box,
    Text,
    useColorModeValue,
    RadioGroup,
    Stack,
    Radio,
    Input,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { addProduct } from '../store/cartSlice';

const AddProductModal = ({ product }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = useState<string>()
    const [extra, setExtra] = useState<string>()
    const [quantity, setQuantity] = useState(1)

    const onSubmit = () => {
        dispatch(addProduct({ ...product, size: product?.sizes?.find(s => s.name === size), extra: product?.extra?.find(e => e.name === extra), quantity }))
        onClose()
    }

    useEffect(() => {
        product?.sizes?.length > 0 && setSize(product?.sizes[0]?.name)
        product?.extra?.length > 0 && setExtra(product?.extra[0]?.name)
    }, [product, setSize])

    const imageSize = useBreakpointValue({ base: '6rem', md: '8rem' })

    return (
        <>
            <Button size="sm" colorScheme='brand' onClick={onOpen}>+ Add</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent pt={4} pb={2}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex gap={4} mt={2}>
                            <Image src={product?.image} width={imageSize} minWidth={imageSize} minHeight={imageSize} height={imageSize} alt={product?.name} borderRadius={8} />
                            <Box>
                                <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>{product?.name}</Text>
                                <Text fontSize="sm" color='gray.500'>{product?.description}</Text>
                                <Text fontSize="sm" fontWeight='semibold' color='gray.500' mt={2}>₹ {product?.price}</Text>
                            </Box>
                        </Flex>
                        <Box my={4}>
                            {
                                product?.sizes?.length > 1 && <RadioGroup onChange={setSize} value={size}>
                                    <Text fontWeight='semibold' fontSize='lg' mb={2}>Size</Text>
                                    <Stack direction='column'>
                                        {
                                            product?.sizes?.map((option, index) => <Flex key={option?.name} justify="space-between"><Radio defaultChecked={index === 1} value={option?.name}>{option?.name}</Radio><Text>₹  {option?.price}</Text></Flex>)
                                        }
                                    </Stack>
                                </RadioGroup>
                            }

                            {
                                product?.extra?.length > 1 && <RadioGroup onChange={setExtra} value={extra} mt={4}>
                                    <Text fontWeight='semibold' fontSize='lg' mb={2}>Extra</Text>
                                    <Stack direction='column'>
                                        {
                                            product?.extra?.map((option, index) => <Flex key={option?.name} justify="space-between"><Radio defaultChecked={index === 1} value={option?.name}>{option?.name}</Radio><Text>₹  {option?.price}</Text></Flex>)
                                        }
                                    </Stack>
                                </RadioGroup>
                            }
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Flex justify="space-between" width="100%" gap={8}>
                            <Flex >
                                <Button colorScheme='gray' onClick={() => setQuantity(oldValue => oldValue <= 1 ? 1 : oldValue - 1)}>-</Button>
                                <Input type="number" textAlign="center" defaultValue={quantity} min={1} max={20} onChange={(e) => setQuantity(Number(e.target.value) > 20 ? 20 : Number(e.target.value))} value={quantity} />
                                <Button colorScheme='gray' onClick={() => setQuantity(oldValue => oldValue >= 20 ? 20 : oldValue + 1)}>+</Button>
                            </Flex>
                            <Flex gap={4}>
                                <Button variant='outline' onClick={onClose} display={{ base: 'none', md: 'block' }}>Cancel</Button>
                                <Button colorScheme='brand' onClick={onSubmit} >
                                    Add to Cart
                                </Button>
                            </Flex>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProductModal