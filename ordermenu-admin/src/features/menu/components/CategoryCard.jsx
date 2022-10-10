import React, { useState } from "react"
import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"

import { FiMoreVertical } from "react-icons/fi"
import CategoryModal from "./CategoryModal"

const CategoryCard = ({ name, description, image, id }) => {
  const [isEditing, setIsEditing] = useState(false)


  const handleEditCategory = () => {
    setIsEditing(true)
  }

  return (
    <>
      <Box bg="white" shadow="sm" borderRadius="0.5rem" p={4} width="100%" height="100%">
        <Box position={"relative"}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={image}
              alt={name}
              borderRadius="0.5rem"
              objectFit={"cover"}
              objectPosition="center center"
            />
          </AspectRatio>

          <Box position="absolute" top={"0.5rem"} right={"0.5rem"}>
            <Menu>
              <MenuButton
                as={FiMoreVertical}
                aria-label="Options"
                icon={<FiMoreVertical />}
                variant="outline"
                cursor={"pointer"}
              />
              <MenuList position="absolute" right={"-1rem"} top="1.5rem">
                <MenuItem onClick={handleEditCategory}>Edit</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <Heading size="md" mt={4}>
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.500" mt={2} noOfLines={2}>
          {description}
        </Text>
        <CategoryModal type="EDIT" isEditing={isEditing} setIsEditing={setIsEditing} category={{ name, description, image, id }} />
      </Box>
    </>
  )
}

export default CategoryCard
