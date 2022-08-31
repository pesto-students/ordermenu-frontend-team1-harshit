import React from 'react'
import { AspectRatio, Box, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'

import { FiMoreVertical } from 'react-icons/fi';

const CategoryCard = () => {
  return (
    <Box bg="white" shadow='sm' borderRadius="0.5rem" p={4}>
      <Box position={'relative'}>
        <AspectRatio ratio={4 / 3}>
          <Image src={'https://bit.ly/dan-abramov'} alt={''} borderRadius="0.5rem" objectFit={'cover'} objectPosition='center center' />
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
              <MenuItem>
                Edit
              </MenuItem>
              <MenuItem color='red.500'>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Heading size='md' mt={4}>
        Classic Smoothies
      </Heading>
      <Text fontSize='sm' color='gray.500' mt={2}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
    </Box >
  )
}

export default CategoryCard