import { useBreakpointValue, Box, withDefaultProps } from '@chakra-ui/react'
import React from 'react'

const Container = ({ children, ...props }) => {
    return (
        <Box px={useBreakpointValue({ base: 4, md: 8, lg: 16 })} {...props}>
            {children}
        </Box>
    )
}

export default Container