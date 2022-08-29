import React from 'react'
import { AspectRatio, Box, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import { FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';

const TableCard = () => {
  return (
    <Box bg="white" shadow='sm' borderRadius="0.5rem" p={4}>
      <Box position={'relative'}>
        <AspectRatio ratio={1}>
          <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Qr-nl-wikipedia-or.svg/396px-Qr-nl-wikipedia-or.svg.png?20180404230944'} alt={''} borderRadius="0.5rem" objectFit={'cover'} objectPosition='center center' />
        </AspectRatio>

        <Box position="absolute" top={'0.5rem'} right={'0.5rem'}>
          <Menu>
            <MenuButton
              as={FiMoreVertical}
              aria-label='Options'
              icon={<FiMoreVertical />}
              variant='outline'
              cursor={'pointer'}
            />
            <MenuList position="absolute" right={'-1rem'} top="1.5rem">
              <MenuItem icon={<FiDownload />}>
                Download
              </MenuItem>
              <MenuItem icon={<FiTrash2 />} color='red.500'>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Heading size='md' mt={4}>
        Table Number - {4}
      </Heading>
    </Box >
  )
}

export default TableCard