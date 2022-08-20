import React from 'react'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import CategoryModal from './components/CategoryModal'

const CategoriesPage = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} align="center">
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
    </>
  )
}

export default CategoriesPage