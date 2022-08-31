import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import CheckoutModal from './CheckoutModal';
import Container from './Container';


export default function Header() {

    return (
        <Box bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.800', 'white')}>
            <Flex
                minH={'60px'}
                py={{ base: 2 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                px={useBreakpointValue({ base: 4, md: 8, lg: 16 })}
                align={'center'}>
                <Flex flex={{ base: 1 }}>
                    <Text
                        textAlign={'left'}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        OrderMenu
                    </Text>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        colorScheme={'gray'}
                        color={"gray.800"}
                    >
                        Sign In
                    </Button>

                    <CheckoutModal />
                </Stack>
            </Flex>
        </Box>
    );
}

