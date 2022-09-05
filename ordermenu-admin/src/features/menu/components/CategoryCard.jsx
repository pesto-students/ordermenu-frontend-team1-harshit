import React from "react"
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
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react"

import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import axios from "axios"
import config from "../../../config"

import { useDisclosure } from "@chakra-ui/react"

import { FiMoreVertical } from "react-icons/fi"

const CategoryCard = ({ name, description, image, id }) => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure()

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure()

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(3, "Too Short!")
      .max(120, "Too Long!")
      .required("Required"),
  })

  const handleDeleteCategory = () => {
    onOpenDelete()
  }

  const handleDeleteButton = async () => {
    try {
      const { data, status } = await axios.delete(
        `${config.URL}/api/v1/categories/${id}`,
        {},
        { withCredentials: true }
      )
      if (status === 200) {
        onCloseDelete()
      }
    } catch (err) {
      console.log(err)
      onCloseDelete()
    }
    // onCloseDelete()
  }

  const handleEditCategory = () => {
    onOpenUpdate()
    // console.log("edit")
  }

  return (
    <>
      <Box bg="white" shadow="sm" borderRadius="0.5rem" p={4}>
        <Box position={"relative"}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={"https://bit.ly/dan-abramov"}
              alt={""}
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
                <MenuItem color="red.500" onClick={handleDeleteCategory}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

        <Heading size="md" mt={4}>
          {name}
        </Heading>
        <Text fontSize="sm" color="gray.500" mt={2}>
          {description}
        </Text>
      </Box>
      {/* For Delete */}
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Delete ${name} Category`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this category?</ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onCloseDelete}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleDeleteButton}>
              Delete Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* For Edit */}
      <Modal isOpen={isOpenUpdate} onClose={onCloseUpdate} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            <Formik
              initialValues={{
                name: name,
                description: description,
                image: image,
              }}
              validationSchema={CategorySchema}
              onSubmit={async (values, actions) => {
                try {
                  const { data, status } = await axios.patch(
                    `${config.URL}/api/v1/categories/${id}`,
                    values,
                    { withCredentials: true }
                  )

                  if (status === 200) {
                    // actions.setSubmitting(false)
                    onCloseUpdate()
                  }
                } catch (err) {
                  console.log(err)
                  onCloseUpdate()
                }
                //
              }}
            >
              {(props) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="Classic Smoothies" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                        mt={4}
                      >
                        <FormLabel>Description</FormLabel>
                        <Input
                          {...field}
                          placeholder="Classic smoothies are great."
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                        mt={4}
                      >
                        <FormLabel>Image</FormLabel>
                        <Input
                          {...field}
                          type="file"
                          placeholder="Classic smoothies are great."
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justify={"end"} mb={4}>
                    <Button mt={4} mr={4} onClick={onCloseUpdate}>
                      Cancel
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="green"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Update Category
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CategoryCard
