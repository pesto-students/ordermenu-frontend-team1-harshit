import React from 'react'
import { Box, useColorModeValue, Tabs, TabList, Tab, Input, InputGroup, InputLeftElement, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

import Container from './Container'

const ScrollToTabs = () => {
    return (
        <Container bg={useColorModeValue('white', 'gray.800')} py={3}>
            <Grid gridTemplateColumns={useBreakpointValue({ base: '1fr', md: '3fr 1fr', lg: '4fr 1fr' })} gap={3}>
                <GridItem>
                    <Tabs variant='soft-rounded' colorScheme='brand'>
                        <TabList>
                            <Tab>Popular</Tab>
                            <Tab>Shakes</Tab>
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