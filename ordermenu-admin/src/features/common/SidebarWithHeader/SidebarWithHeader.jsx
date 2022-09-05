import React from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi"
import {
  RiShoppingCart2Line,
  RiHome4Line,
  RiBookletLine,
  RiRestaurantLine,
  RiRestaurant2Line,
  RiSettings4Line,
  RiPassportLine,
  RiTable2,
} from "react-icons/ri"
import { Link, Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"

const LinkItems = [
  { name: "Dashboard", icon: RiHome4Line, path: "/dashboard" },
  {
    name: "Menu",
    icon: RiBookletLine,
    path: "/menu",
    subLinks: [
      { name: "Categories", icon: RiPassportLine, path: "/menu/categories" },
      {
        name: "Food & Drinks",
        icon: RiRestaurantLine,
        path: "/menu/food-drinks",
      },
    ],
  },
  { name: "Tables", icon: RiTable2, path: "/tables" },
  { name: "Orders", icon: RiShoppingCart2Line, path: "/orders" },
  {
    name: "Reaturant Details",
    icon: RiRestaurant2Line,
    path: "/restaurant-details",
  },
  { name: "Settings", icon: RiSettings4Line, path: "/settings" },
]

const SidebarWithHeader = () => {
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const SidebarContent = ({ onClose, ...rest }) => {
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            OrderMenu
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem
            isSelected={location.pathname.includes(link.path)}
            path={link.path}
            key={link.name}
            icon={link.icon}
            subLinks={link.subLinks}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    )
  }

  const NavItem = ({ icon, children, path, subLinks, isSelected, ...rest }) => {
    return (
      <div>
        <Link
          to={subLinks && subLinks.length > 0 ? subLinks[0]?.path : path}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            px="8"
            py="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            bg={isSelected ? "green.50" : "white"}
            color={isSelected ? "green.400" : "gray.600"}
            _hover={{
              bg: "green.50",
              color: "green.400",
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "green.400",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>

        {location.pathname.includes(path) &&
          subLinks &&
          subLinks.length > 0 &&
          subLinks.map((link) => {
            return (
              <SubNavItem
                isSelected={location.pathname.includes(link.path)}
                path={link.path}
                key={link.name}
                icon={link.icon}
                subLinks={link.subLinks}
              >
                {link.name}
              </SubNavItem>
            )
          })}
      </div>
    )
  }

  const SubNavItem = ({
    icon,
    children,
    path,
    subLinks,
    isSelected,
    ...rest
  }) => {
    return (
      <div>
        <Link
          to={subLinks && subLinks.length > 0 ? path + subLinks[0]?.path : path}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Flex
            align="center"
            pl="12"
            py="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            bg={isSelected ? "green.50" : "white"}
            color={isSelected ? "green.400" : "gray.600"}
            _hover={{
              bg: "green.50",
              color: "green.400",
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "green.400",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      </div>
    )
  }

  const MobileNav = ({ onOpen, ...rest }) => {
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          OrderMenu
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">Justina Clark</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
