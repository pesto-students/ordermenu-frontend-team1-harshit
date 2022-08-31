import React from 'react'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import CategoryModal from './components/CategoryModal'
import CategoryCard from './components/CategoryCard'

const CategoriesPage = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} align="center" mb="4">
        <Breadcrumb spacing='0.5rem' separator={<FiChevronRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#' color='gray.500' fontWeight={'semibold'}>Menu</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#' fontWeight={'bold'} >Categories</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <CategoryModal />
      </Flex>

      <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
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
    </>
  )
}

export default CategoriesPage