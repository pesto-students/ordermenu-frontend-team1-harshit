import React, { useState } from "react"
import {
  Center,
  Text,
  TableContainer,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react"
import { FiMoreVertical } from "react-icons/fi"
import { useEffect } from "react"
import axios from "axios"
import config from "../../config"

const OrderOptions = () => {
  return (
    <Menu>
      <MenuButton
        as={FiMoreVertical}
        aria-label="Options"
        icon={<FiMoreVertical />}
        variant="outline"
        cursor={"pointer"}
      />
      <MenuList position="absolute" right={"-1rem"} top="1.5rem">
        <MenuItem>Edit</MenuItem>
        <MenuItem color="red.500">Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
  })

  async function getOrders() {
    try {
      const { data, status } = await axios.get(
        `${config.URL}/api/v1/orders`,
        {},
        { withCredentials: true }
      )
      if (status === 200) setOrders(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {orders.length !== 0 ? (
        <Center>
          <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
            Your shop does not have any orders
          </Text>
        </Center>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Tags</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Random Person</Td>
                <Td>452</Td>
                <Td>Pending</Td>
                <Td></Td>
                <Td>
                  <OrderOptions />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default OrdersPage
