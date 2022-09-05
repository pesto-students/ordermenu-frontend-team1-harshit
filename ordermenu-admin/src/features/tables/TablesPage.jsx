import React, { useState, useEffect } from "react"
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
import TableModal from "./components/TableModal"
import TableCard from "./components/TableCard"
import config from "../../config"
import axios from "axios"

const TablesPage = () => {
  const [tables, setTables] = useState([])

  useEffect(() => {
    getTableData()
  }, [])

  async function getTableData() {
    try {
      const { data, status } = await axios.get(`${config.URL}/api/v1/tables`)
      if (status === 200) {
        setTables(data)
      }
    } catch (err) {
      console.log(err)
    }
  }
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

        <TableModal setTables={setTables} />
      </Flex>
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
          {tables.map((table) => {
            return (
              <GridItem>
                <TableCard />
              </GridItem>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default TablesPage
