import React from 'react'
import { AspectRatio, Box, Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";

interface IHeroSectionProps {
    name: string;
    tagline: string;
    description: string;
    address: string;
    background: string;
    logo: string;
}

const HeroSection = ({ background, logo, name, tagline, description, address }: IHeroSectionProps) => {
    return (
        <AspectRatio ratio={useBreakpointValue({ base: 1, sm: 16 / 9, md: 16 / 9, lg: 16 / 5 })}>
            <Box
                background={`url(${background})`}
                objectFit="cover"
                objectPosition="center center"
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"

            >
                <Flex flexDirection="column" align="center" justify="center" textAlign="center" background="rgba(0, 0, 0, 0.5)" height="100%" width={"100%"} p={4}>
                    <Image boxSize={useBreakpointValue({ base: '10rem', md: "12rem" })} borderRadius="100%" objectFit="cover" objectPosition="center" src={logo} alt={name} />
                    <Heading as='h1' size='lg' noOfLines={1} color="white" mt={4}>
                        {name}
                    </Heading>
                    <Text color="gray.200" fontSize='lg' noOfLines={1} mt={2}>
                        {tagline}
                    </Text>
                </Flex>
            </Box>
        </AspectRatio>
    )
}

export default HeroSection