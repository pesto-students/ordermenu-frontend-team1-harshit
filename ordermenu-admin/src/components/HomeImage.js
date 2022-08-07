import React from 'react'
import { Grid, GridItem, Image } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/media-query'
import propTypes from 'prop-types'

import homepage_food from '../assets/homepage_food.jpg'

export default function HomeImage({ children }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
      gap={0}
    >
      {!isMobile ? (
        <GridItem>
          <Image
            src={homepage_food}
            objectFit="cover"
            height="100vh"
            width="50vw"
            fallbackSrc="https://via.placeholder.com/150"
          />
        </GridItem>
      ) : (
        <></>
      )}
      <GridItem bg="gray.100" height="100vh">
        {children}
      </GridItem>
    </Grid>
  )
}

HomeImage.propTypes = {
  children: propTypes.any,
}
