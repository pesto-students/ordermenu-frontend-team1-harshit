import React, { useEffect } from "react"
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Center, Text
} from "@chakra-ui/react"
import { FiChevronRight } from "react-icons/fi"
import { useSelector, useDispatch } from "react-redux"

import CategoryModal from "./components/CategoryModal"
import CategoryCard from "./components/CategoryCard"
import { fetchAllCategories, selectCategory } from "../../store/categorySlice"
import Loader from "../common/Loader/Loader"

const CategoriesPage = () => {
  const dispatch = useDispatch()
  const { isLoading, categories } = useSelector(selectCategory)

  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [dispatch])

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

      {
        isLoading ? <Loader /> : <>
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
              {categories.map(({ name, description, image, _id }) => {
                return (
                  <GridItem key={_id}>
                    <CategoryCard
                      id={_id}
                      name={name}
                      description={description}
                      image={image}
                    />
                  </GridItem>
                )
              })}
            </Grid>
          )}
        </>
      }
    </>
  )
}

export default CategoriesPage
