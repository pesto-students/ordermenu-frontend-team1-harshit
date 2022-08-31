import React from 'react'
import { Grid, GridItem, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'

import { Container, ProductCard } from './'

const CategorizedProducts = () => {
    return (
        <Container py={useBreakpointValue({ base: 4, md: 8 })}>
            <Text fontSize="xl" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>Popular</Text>

            <Grid templateColumns={useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' })} gap={4} mt={4}>
                <GridItem w='100%' bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                    <ProductCard />
                </GridItem>
                <GridItem w='100%' bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                    <ProductCard />
                </GridItem>
                <GridItem w='100%' bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                    <ProductCard />
                </GridItem>
                <GridItem w='100%' bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                    <ProductCard />
                </GridItem>
                <GridItem w='100%' bg={useColorModeValue('white', 'gray.800')} borderRadius={8}>
                    <ProductCard />
                </GridItem>

            </Grid>
        </Container>
    )
}

export default CategorizedProducts