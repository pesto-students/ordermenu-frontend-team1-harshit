import React, { useState } from 'react'
import { AspectRatio, Box, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { FiMoreVertical } from 'react-icons/fi';
import ProductModal from './ProductModal';
import { deleteProductAction } from '../../../store/productSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Box bg="white" shadow='sm' borderRadius="0.5rem" p={4} width="100%" height="100%">
      <Box position={'relative'}>
        <AspectRatio ratio={4 / 3}>
          <Image src={product?.image} alt={product?.name} borderRadius="0.5rem" objectFit={'cover'} objectPosition='center center' />
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
              <MenuItem onClick={() => setIsEditing(true)}>
                Edit
              </MenuItem>
              <MenuItem color='red.500' onClick={() => dispatch(deleteProductAction(product?._id))}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Heading size='md' mt={3}>
        {product?.name}
      </Heading>
      <Text fontSize='lg' fontWeight='bold' mt={2}>₹ {product?.price}</Text>
      <Text fontSize='sm' color='gray.500' mt={2} noOfLines={2}>{product?.description}</Text>
      <ProductModal type="EDIT" isEditing={isEditing} setIsEditing={setIsEditing} product={product} />
    </Box >
  )
}

export default ProductCard