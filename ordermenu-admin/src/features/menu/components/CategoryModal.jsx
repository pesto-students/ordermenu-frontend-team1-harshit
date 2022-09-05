import React from "react"
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
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react"
import config from "../../../config"
import axios from "axios"

const CategoryModal = ({ setNewCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  return (
    <Box>
      <Button colorScheme="green" onClick={onOpen}>
        Add Category
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            <Formik
              initialValues={{ name: "", description: "", image: "" }}
              validationSchema={CategorySchema}
              onSubmit={async (values, actions) => {
                try {
                  const { status, data } = await axios.post(
                    `${config.URL}/api/v1/categories`,
                    values,
                    { withCredentials: true }
                  )
                  if (status === 200) {
                    // actions.setSubmitting(false)
                    setNewCategory(data)
                    onClose()
                  }
                } catch (err) {
                  console.log(err)
                  onClose()
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
                    <Button mt={4} mr={4} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      mt={4}
                      colorScheme="green"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Add Category
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CategoryModal
