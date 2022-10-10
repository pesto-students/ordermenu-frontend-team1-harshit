import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <Flex justify='center' align='center' minHeight={'50vh'}>
      <Spinner colorScheme={'green'} />
    </Flex>
  )
}

export default Loader