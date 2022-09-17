import React, { useMemo, useState } from "react"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import isEqual from 'lodash/isEqual'
import { FiChevronRight } from "react-icons/fi"

import { fetchAllOrders, selectNewOrders, selectOrder } from "../../store/orderSlice"
import OrderTable from "./components/OrderTable"
import { selectPartner } from "../../store/partnerSlice"
import StatusRenderer from "./components/StatusRenderer"
import Loader from "../common/Loader/Loader"



const OrdersPage = () => {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = useState(0)
  const { partner } = useSelector(selectPartner, isEqual)
  const newOrders = useSelector(selectNewOrders, isEqual)
  const { isLoading, orders } = useSelector(selectOrder, isEqual)

  const getSelectedTab = (selectedTab) => {
    switch (selectedTab) {
      case 0:
        return ''
      case 1:
        return 'PENDING'
      case 2:
        return 'ACCEPTED'
      case 3:
        return 'COMPLETED'
      case 4:
        return 'CANCELLED'
      default:
        return ''
    }
  }


  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'user.name',

    },
    {
      Header: 'Total Amount',
      accessor: 'totalBillAmount'
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (status) => {
        return <StatusRenderer status={status.value} />
      }
    },
    {
      Header: 'Table Number',
      accessor: 'tableNumber'
    }
  ], [])

  const data = useMemo(() => orders.results, [orders])

  const otherInfo = useMemo(() => ({
    limit: orders.limit,
    page: orders.page,
    totalResults: orders.totalResults,
    totalPages: orders.totalPages
  }), [orders])

  useEffect(() => {
    if (selectedTab !== 1) {
      if (partner._id) {
        dispatch(fetchAllOrders({ partnerId: partner?._id, sortBy: '-createdAt', limit: '10', page: '1', status: getSelectedTab(selectedTab) }))
      }
    }
  }, [dispatch, partner._id, selectedTab])

  return (
    <>
      <Breadcrumb spacing="0.5rem" separator={<FiChevronRight />}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" fontWeight={"bold"}>
            Orders
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Tabs mt={2} colorScheme="green" onChange={value => setSelectedTab(value)}>
        <TabList >
          <Tab value="All">All</Tab>
          <Tab value="New">New Orders</Tab>
          <Tab value="Pending">Pending</Tab>
          <Tab value="Accepted">Accepted</Tab>
          <Tab value="Completed">Completed</Tab>
          <Tab value="Cancelled">Cancelled</Tab>
        </TabList>

        {
          selectedTab === 1 ? <Box mt={4}>
            {
              isLoading ? <Loader /> : <> {newOrders?.length === 0 ? (
                <Center>
                  <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
                    Your shop does not have any new orders
                  </Text>
                </Center>
              ) : (
                <OrderTable columns={columns} data={newOrders} {...otherInfo} status={getSelectedTab(selectedTab)} partnerId={partner._id} footer={false} />
              )}</>
            }
          </Box> :

            <Box mt={4}>
              {
                isLoading ? <Loader /> : <> {orders?.results?.length === 0 ? (
                  <Center>
                    <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
                      Your shop does not have any orders
                    </Text>
                  </Center>
                ) : (
                  <OrderTable columns={columns} data={data} {...otherInfo} status={getSelectedTab(selectedTab)} partnerId={partner._id} />
                )}</>
              }
            </Box>
        }
      </Tabs>
    </>
  )
}

export default OrdersPage
