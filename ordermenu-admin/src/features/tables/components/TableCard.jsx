import React from 'react'
import { AspectRatio, Box, Heading, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useDispatch } from "react-redux"

import { FiMoreVertical, FiDownload, FiTrash2 } from 'react-icons/fi';
import { deleteTableAction } from '../../../store/tableSlice';

const TableCard = ({ table }) => {
  const dispatch = useDispatch()

  async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = `qr-${table?.number}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Box bg="white" shadow='sm' borderRadius="0.5rem" p={4}>
      <Box position={'relative'}>
        <AspectRatio ratio={1}>
          <Image src={table?.qrCode} alt={table?.number} borderRadius="0.5rem" objectFit={'cover'} objectPosition='center center' />
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
              <MenuItem icon={<FiDownload />} onClick={() => downloadImage(table?.qrCode)}>
                Download
              </MenuItem>
              <MenuItem icon={<FiTrash2 />} color='red.500' onClick={() => dispatch(deleteTableAction(table?._id))}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Heading size='md' mt={4}>
        Table Number - {table?.number}
      </Heading>
    </Box >
  )
}

export default TableCard