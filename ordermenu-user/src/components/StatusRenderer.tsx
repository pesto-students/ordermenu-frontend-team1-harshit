import { Badge } from '@chakra-ui/react'
import React from 'react'

const StatusRenderer = ({ status }) => {

  if (status === "PENDING")
    return (
      <Badge variant='solid' colorScheme='gray'>
        PENDING
      </Badge>
    )

  if (status === "ACCEPTED")
    return (
      <Badge variant='solid' colorScheme='green'>
        ACCEPTED
      </Badge>
    )

  if (status === "COMPLETED")
    return (
      <Badge variant='solid' colorScheme='blue'>
        COMPLETED
      </Badge>
    )

  if (status === "CANCELLED")
    return (
      <Badge variant='solid' colorScheme='red'>
        CANCELLED
      </Badge>
    )

  return <>"Final"</>
}

export default StatusRenderer