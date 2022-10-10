import React from 'react'
import { Grid, GridItem, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'

import { Container, ProductCard } from './'
import { generateSlug } from '../helper/generateSlug'

const CategorizedProducts = ({ categorizedProducts }) => {
    const bg = useColorModeValue('white', 'gray.800')
    return (
        <Container py={useBreakpointValue({ base: 4, md: 8 })} id={generateSlug(categorizedProducts?.name)}>
            <Text fontSize="xl" fontWeight="semibold" color={useColorModeValue('gray.800', 'white')}>{categorizedProducts?.name}</Text>

            <Grid templateColumns={useBreakpointValue({ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' })} gap={4} mt={4}>
                {
                    categorizedProducts?.products?.map(product => (<GridItem key={product._id} w='100%' bg={bg} borderRadius={8}>
                        <ProductCard product={product} />
                    </GridItem>))
                }
            </Grid>
        </Container>
    )
}

export default CategorizedProducts
