import React from "react"
import {
  Center,
  Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllOrders, selectOrder } from "../../store/orderSlice"
import OrderTable from "./components/OrderTable"
import { selectPartner } from "../../store/partnerSlice"

const OrdersPage = () => {
  const dispatch = useDispatch()
  const { partner } = useSelector(selectPartner)
  const { orders } = useSelector(selectOrder)

  useEffect(() => {
    if (partner._id) {
      if (orders.length === 0) {
        dispatch(fetchAllOrders(partner?._id))
      }
    }
  }, [dispatch, partner._id, orders.length])


  return (
    <>
      {orders.length === 0 ? (
        <Center>
          <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
            Your shop does not have any orders
          </Text>
        </Center>
      ) : (
        <OrderTable orders={orders} />
      )}
    </>
  )
}

export default OrdersPage
