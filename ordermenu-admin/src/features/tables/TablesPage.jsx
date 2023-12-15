import React, { useEffect } from "react"
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Center,
  Text,
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import { useSelector, useDispatch } from "react-redux"

import TableModal from "./components/TableModal"
import TableCard from "./components/TableCard"
import { fetchAllTables, selectTable } from "../../store/tableSlice"
import Loader from "../common/Loader/Loader"

const TablesPage = () => {
  const dispatch = useDispatch()
  const { isLoading, tables } = useSelector(selectTable)


  useEffect(() => {
    dispatch(fetchAllTables())
  }, [dispatch])

  return (
    <>
      <Flex justifyContent={"space-between"} align="center" mb={4}>
        <Breadcrumb spacing="0.5rem" separator={<FiChevronRight />}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontWeight={"bold"}>
              Tables
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <TableModal />
      </Flex>
      {
        isLoading ? <Loader /> : <>
          {tables.length === 0 ? (
            <Center>
              <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
                Your shop does not have any products
              </Text>
            </Center>
          ) : (
            <Grid
              gridTemplateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={4}
            >
              {tables.map((table) => <GridItem key={table?._id}>
                <TableCard table={table} />
              </GridItem>
              )}
            </Grid>
          )}
        </>
      }
    </>
  )
}

export default TablesPage
