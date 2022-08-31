import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalBody, ModalCloseButton, ModalHeader, Text, FormControl, FormLabel, Input, FormErrorMessage, Flex } from '@chakra-ui/react'

const ProductModal = () => {
  const [sizes, setSizes] = useState([])
  const [extra, setExtra] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(sizes, setSizes, extra, setExtra)

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(120, 'Too Long!')
      .required('Required'),
  })

  return (
    <Box>
      <Button colorScheme='green' onClick={onOpen}>Add Product</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text></Text>
            <Formik
              initialValues={{ name: '', description: '', image: '' }}
              validationSchema={CategorySchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
              }}
            >
              {(props) => (
                <Form>
                  <Field name='name'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder='Classic Smoothies' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='image' >
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.image && form.touched.image} mt={4}>
                        <FormLabel>Image</FormLabel>
                        <Input {...field} type='file' placeholder='Classic smoothies are great.' />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='price'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.price && form.touched.price} mt={4}>
                        <FormLabel>Price</FormLabel>
                        <Input {...field} placeholder='450' type='number' />
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='description'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.description && form.touched.description} mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Input {...field} placeholder='Classic smoothies are great.' />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Formik
                    initialValues={{ name: '', description: '', image: '' }}
                    validationSchema={CategorySchema}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                      }, 1000)
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Flex justify={'space-between'} align="self-end" gap={4}>
                          <Field name='name'>
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.name && form.touched.name} mt={4}>
                                <FormLabel>Size</FormLabel>
                                <Input {...field} placeholder='Regular' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name='price'>
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.price && form.touched.price} mt={4}>
                                <Input {...field} placeholder='0' type='number' />
                                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            mt={4}
                            colorScheme='green'
                            variant={'outline'}
                            isLoading={props.isSubmitting}
                            type='submit'
                          >
                            Add
                          </Button>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                  <Formik
                    initialValues={{ name: '', description: '', image: '' }}
                    validationSchema={CategorySchema}
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                      }, 1000)
                    }}
                  >
                    {(props) => (
                      <Form>
                        <Flex justify={'space-between'} align="self-end" gap={4}>
                          <Field name='name'>
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.name && form.touched.name} mt={4}>
                                <FormLabel>Extra</FormLabel>
                                <Input {...field} placeholder='Regular' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name='price'>
                            {({ field, form }) => (
                              <FormControl isInvalid={form.errors.price && form.touched.price} mt={4}>
                                <Input {...field} placeholder='0' type='number' />
                                <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            mt={4}
                            colorScheme='green'
                            variant={'outline'}
                            isLoading={props.isSubmitting}
                            type='submit'
                          >
                            Add
                          </Button>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                  <Flex justify={'end'} mb={4}>
                    <Button
                      mt={4}
                      mr={4}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      mt={4}
                      colorScheme='green'
                      isLoading={props.isSubmitting}
                      type='submit'
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

export default ProductModal