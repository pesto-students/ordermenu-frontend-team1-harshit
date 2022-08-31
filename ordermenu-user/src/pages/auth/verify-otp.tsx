import React from 'react'
import { Box, Flex, FormControl, FormLabel, NumberInput, Text, useBreakpointValue, useColorModeValue, Button, HStack, PinInput, PinInputField } from '@chakra-ui/react'

const VerifyOtp = () => {
    return (
        <Flex height="90vh" justify="center" align="center">
            <Box bg={useColorModeValue('white', 'gray.800')} m={4} width={useBreakpointValue({ base: '100%', md: '24rem' })} p={useBreakpointValue({ base: 4, md: 8 })} borderRadius={8} shadow="sm">
                <Text fontSize="lg" fontWeight="semibold">Have you received a verification code?
                </Text>
                <Text fontSize="xs" color="gray.500">We've sent you a verification code to your phone - 8989475132 <Button variant='ghost' size="xs" colorScheme='brand'>Resend</Button></Text>
                <HStack my={4}>
                    <PinInput type='number' mask>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                    </PinInput>
                </HStack>

                <Button colorScheme='brand' width="100%">Submit</Button>
            </Box>
        </Flex >
    )
}

export default VerifyOtp