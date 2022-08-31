import React from 'react'
import { Box, Flex, FormControl, FormLabel, NumberInput, Text, useBreakpointValue, useColorModeValue, NumberInputField, Button } from '@chakra-ui/react'

const Signin = () => {
    return (
        <Flex height="90vh" justify="center" align="center">
            <Box bg={useColorModeValue('white', 'gray.800')} m={4} width={useBreakpointValue({ base: '100%', md: '24rem' })} p={useBreakpointValue({ base: 4, md: 8 })} borderRadius={8} shadow="sm">
                <Text fontSize="lg" fontWeight="semibold">Create an account or Sign in</Text>
                <Text fontSize="xs" color="gray.500">It's quick and easy</Text>
                <FormControl my={4}>
                    <FormLabel>Enter phone number</FormLabel>
                    <NumberInput max={10} min={10}>
                        <NumberInputField />
                    </NumberInput>
                </FormControl>

                <Button colorScheme='brand' width="100%">Proceed</Button>
            </Box>
        </Flex>
    )
}

export default Signin