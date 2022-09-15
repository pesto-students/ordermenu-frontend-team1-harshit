import React from 'react'
import Link from 'next/link'
import { Box, useColorModeValue, Tabs, TabList, Tab, Input, InputGroup, InputLeftElement, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

import Container from './Container'
import { generateSlug } from '../helper/generateSlug'

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
            <Tabs variant='soft-rounded' colorScheme='brand' overflowX={'scroll'} scrollBehavior="smooth">
                <TabList>
                    {
                        categories?.map(category => <Link key={category._id} href={`#${generateSlug(category.name)}`} scroll={false} passHref><Tab>{category.name}</Tab></Link>)
                    }
                </TabList>
            </Tabs>
        </Container>
    )
}

export default ScrollToTabs