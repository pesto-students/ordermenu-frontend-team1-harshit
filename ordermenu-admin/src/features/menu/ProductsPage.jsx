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
import { useSelector, useDispatch } from 'react-redux'
import { FiChevronRight } from "react-icons/fi"
import ProductModal from "./components/ProductModal"
import ProductCard from "./components/ProductCard"
import { fetchAllProducts, selectProduct } from "../../store/productSlice"
import Loader from "../common/Loader/Loader"

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { isLoading, products } = useSelector(selectProduct)

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

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
      {
        isLoading ? <Loader /> : <>
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

              {
                products?.map(product => <GridItem key={product._id}>
                  <ProductCard product={product} />
                </GridItem>)
              }
            </Grid>
          )}
        </>
      }
    </>
  )
}

export default ProductsPage
