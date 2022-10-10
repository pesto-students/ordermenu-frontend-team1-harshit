import React, { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Image
} from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { uploadFile } from "../../../apis/"
import { addCategoryAction, updateCategoryAction } from "../../../store/categorySlice"

const CategoryModal = ({ type, isEditing, setIsEditing, category }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure(type === "EDIT" ? { isOpen: isEditing, onOpen: () => setIsEditing(true), onClose: () => setIsEditing(false) } : {})
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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

  const onImageChange = async (event) => {
    try {
      setIsLoading(true)
      const tempFiles = event.target.files;
      if (tempFiles && tempFiles[0]) {
        const { url } = await uploadFile(tempFiles[0])
        setImage(url)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setImage(category?.image);
  }, [category?.image])

  return (
    <Box>
      {
        type === "EDIT" ? '' : <Button colorScheme="green" onClick={onOpen}>
          Add Category
        </Button>
      }
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxHeight={"90vh"} >
          <ModalHeader>{type === "EDIT" ? "Edit" : "Create a new"} category</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY='scroll'>
            <Formik
              initialValues={type === "EDIT" ? { name: category.name, description: category.description, image: category.image } : { name: "", description: "", image: "" }}
              validationSchema={CategorySchema}
              onSubmit={async (values, actions) => {
                values.image = image
                if (type === "EDIT") {
                  dispatch(updateCategoryAction({ categoryId: category.id, category: values }))
                } else {
                  dispatch(addCategoryAction(values))
                }
                setImage('')
                onClose()
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
                  <Field name="image"  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                        mt={4}
                      >
                        <FormLabel>Image</FormLabel>
                        <Input
                          // {...field}
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={onImageChange}
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {
                    image && <Box my={4}>
                      <FormLabel>Image Preview</FormLabel>
                      <Image src={image} alt={''} />
                    </Box>
                  }

                  <Flex justify={"end"} mb={4}>
                    <Button mt={4} mr={4} onClick={() => { onClose(); setImage(null); }}>
                      Cancel
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="green"
                      isLoading={props.isSubmitting || isLoading}
                      type="submit"
                    >
                      {type === "EDIT" ? "Edit" : "Add"} Category
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box >
  )
}

export default CategoryModal
