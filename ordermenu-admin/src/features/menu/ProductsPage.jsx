import React from 'react'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import ProductModal from './components/ProductModal'

const ProductsPage = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} align="center">
        <Breadcrumb spacing='0.5rem' separator={<FiChevronRight />}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#' color='gray.500' fontWeight={'semibold'}>Menu</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#' fontWeight={'bold'} >Food & Drinks</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ProductModal />
      </Flex>
    </>
  )
}

export default ProductsPage