import React, { useState } from "react"
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
import ProductModal from "./components/ProductModal"
import ProductCard from "./components/ProductCard"
import config from "../../config"
import axios from "axios"
import { useEffect } from "react"

const ProductsPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    try {
      const { data, status } = await axios.get(
        `${config.URL}/api/v1/products`,
        {},
        { withCredentials: true }
      )
      if (status === 200) setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Flex justifyContent={"space-between"} align="center" mb={4}>
        <Breadcrumb spacing="0.5rem" separator={<FiChevronRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" color="gray.500" fontWeight={"semibold"}>
              Menu
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontWeight={"bold"}>
              Food & Drinks
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ProductModal />
      </Flex>
      {products.length === 0 ? (
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
          <GridItem>
            <ProductCard />
          </GridItem>
          <GridItem>
            <ProductCard />
          </GridItem>
          <GridItem>
            <ProductCard />
          </GridItem>
          <GridItem>
            <ProductCard />
          </GridItem>
        </Grid>
      )}
    </>
  )
}

export default ProductsPage
