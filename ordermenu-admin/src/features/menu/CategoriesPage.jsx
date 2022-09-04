import React, { useState } from "react"
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { Center, Text } from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import CategoryModal from "./components/CategoryModal"
import CategoryCard from "./components/CategoryCard"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"
import axios from "axios"
import config from "../../config"

const CategoriesPage = () => {
  const { authState, setAuthState } = useAuth()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    try {
      const { data, status } = await axios.get(
        `${config.URL}/api/v1/categories`,
        {},
        { withCredentials: true }
      )
      if (status === 200) setCategories(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Flex justifyContent={"space-between"} align="center" mb="4">
        <Breadcrumb spacing="0.5rem" separator={<FiChevronRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" color="gray.500" fontWeight={"semibold"}>
              Menu
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontWeight={"bold"}>
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <CategoryModal />
      </Flex>

      {categories.length === 0 ? (
        <Center>
          <Text fontSize="xl" md="1" color="gray.400" mt={12} ml={2}>
            Your shop does not have any categories
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
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
        </Grid>
      )}
    </>
  )
}

export default CategoriesPage
