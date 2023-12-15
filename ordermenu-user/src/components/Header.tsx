import Link from 'next/link'
import {
    Box,
    Flex,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    Menu,
    MenuButton,
    Avatar,
    MenuList,
    MenuItem,
    MenuDivider,
    Image
} from '@chakra-ui/react';
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'js-cookie'

import CheckoutModal from './CheckoutModal';
import { selectIsAuthenticated, setAuthState } from '../store/authSlice';
import { useRouter } from 'next/router';

export default function Header() {
    const { pathname } = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const onLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(setAuthState(false))
    }


    return (
        <Box bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.800', 'white')} position="fixed" top="0" width="100%" zIndex={999}>
            <Flex
                height={'4rem'}
                py={{ base: 2 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                px={useBreakpointValue({ base: 4, md: 8, lg: 16 })}
                align={'center'}>
                <Flex flex={{ base: 1 }}>
                    <Image src="/assets/logo.svg" alt="ordermenu logo" height="2rem" />
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={4}>
                    {
                        !isAuthenticated && <>
                            <Link href="/auth/signin" passHref>
                                <Button
                                    fontSize={'sm'}
                                    variant={'outline'}
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Box display={{ base: pathname.includes('auth') ? 'block' : 'none', md: 'block' }}>
                                <Link href="/auth/signup" passHref>
                                    <Button
                                        fontSize={'sm'}
                                        colorScheme={'brand'}

                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </Box>

                        </>


                    }

                    {
                        !pathname.includes('auth') && pathname !== '/' && <CheckoutModal />
                    }

                    {
                        isAuthenticated && <Flex alignItems={'center'}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={
                                            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
                                        }
                                    />
                                </MenuButton>
                                <MenuList>

                                    <Link href="/my-orders">
                                        <MenuItem>
                                            My Orders
                                        </MenuItem>
                                    </Link>
                                    <MenuDivider />
                                    <MenuItem color="red.500" onClick={onLogout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    }

                </Stack>
            </Flex >
        </Box >
    );
}

