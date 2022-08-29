import React from 'react'
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
    Radio
} from '@chakra-ui/react'

const AddProductModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = React.useState('1')
    const [extra, setExtra] = React.useState('1')
    return (
        <>
            <Button size="sm" colorScheme='brand' onClick={onOpen}>+ Add</Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent pt={4} pb={2}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex gap={4} mt={2}>
                            <Image src={'https://picsum.photos/200'} width={useBreakpointValue({ base: '6rem', md: '8rem' })} alt={''} borderRadius={8} />
                            <Box>
                                <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>Bagel With Smoked Salmon</Text>
                                <Text fontSize="sm" color='gray.500'>Bagel With Smoked Salmon</Text>
                                <Text fontSize="sm" fontWeight='semibold' color='gray.500' mt={2}>₹ 420</Text>
                            </Box>
                        </Flex>
                        <Box my={4}>
                            <RadioGroup onChange={setSize} value={size}>
                                <Text fontWeight='semibold' fontSize='lg' mb={2}>Size</Text>
                                <Stack direction='column'>
                                    <Radio value='1'>First</Radio>
                                    <Radio value='2'>Second</Radio>
                                    <Radio value='3'>Third</Radio>
                                </Stack>
                            </RadioGroup>
                            <RadioGroup onChange={setExtra} value={extra} mt={4}>
                                <Text fontWeight='semibold' fontSize='lg' mb={2}>Extra</Text>
                                <Stack direction='column'>
                                    <Radio value='1'>First</Radio>
                                    <Radio value='2'>Second</Radio>
                                    <Radio value='3'>Third</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme='brand' >
                            Add to Cart
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProductModal