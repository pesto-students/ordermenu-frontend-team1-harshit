import React from 'react'
import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Grid, GridItem } from '@chakra-ui/react'
import { FiChevronRight } from 'react-icons/fi'
import TableModal from './components/TableModal'
import TableCard from './components/TableCard'

const TablesPage = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} align="center" mb={4}>
        <Breadcrumb spacing='0.5rem' separator={<FiChevronRight />}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#' fontWeight={'bold'} >Tables</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <TableModal />
      </Flex>
      <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
        <GridItem>
          <TableCard />
        </GridItem>
        <GridItem>
          <TableCard />
        </GridItem>
        <GridItem>
          <TableCard />
        </GridItem>
        <GridItem>
          <TableCard />
        </GridItem>
      </Grid>
    </>
  )
}

export default TablesPage