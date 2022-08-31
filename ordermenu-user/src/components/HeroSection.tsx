import React from 'react'
import { AspectRatio, Box, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";

const HeroSection = () => {
    return (
        <AspectRatio ratio={useBreakpointValue({ base: 1, sm: 16 / 9, md: 16 / 9, lg: 16 / 5 })}>
            <Box
                background={`url(https://static.nationalgeographic.co.uk/files/styles/image_3200/public/tryitnow_GettyImages-1127515284_HR.webp?w=1600&h=1067&q=100)`}
                objectFit="cover"
                objectPosition="center center"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"

            >
                <Flex flexDirection="column" align="center" justify="center" textAlign="center" background="rgba(0, 0, 0, 0.5)" height="100%" width={"100%"} p={4}>
                    <Image boxSize={useBreakpointValue({ base: '10rem', md: "12rem" })} borderRadius="100%" objectFit="cover" objectPosition="center" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Heading as='h1' size='lg' noOfLines={1} color="white" mt={4}>
                        In love with React
                    </Heading>
                    <Text color="gray.200" fontSize='lg' noOfLines={1} mt={2}>
                        (4xl) In love with React & Next (4xl) In love with React & Next
                    </Text>
                </Flex>
            </Box>
        </AspectRatio>
    )
}

export default HeroSection