import React from 'react'
import Link from 'next/link'
import { Box, useColorModeValue, Tabs, TabList, Tab, Input, InputGroup, InputLeftElement, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

import Container from './Container'
import { generateSlug } from 'src/helper/generateSlug'

interface IScrollToTabsProps {
    categories: {
        _id: string;
        name: string;
        description: string;
        image: string;
    }[]
}

const ScrollToTabs = ({ categories }: IScrollToTabsProps) => {
    return (
        <Container bg={useColorModeValue('white', 'gray.800')} py={3}>
            <Grid gridTemplateColumns={useBreakpointValue({ base: '1fr', md: '3fr 1fr', lg: '4fr 1fr' })} gap={3}>
                <GridItem>
                    <Tabs variant='soft-rounded' colorScheme='brand'>
                        <TabList>
                            {
                                categories?.map(category => <Link key={category._id} href={`#${generateSlug(category.name)}`} scroll={false} passHref><Tab>{category.name}</Tab></Link>)
                            }
                        </TabList>
                    </Tabs>
                </GridItem>
                <GridItem>
                    <InputGroup >
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Search2Icon color='gray.300' />}
                        />
                        <Input type='text' placeholder='Search' />
                    </InputGroup>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default ScrollToTabs