import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Modal, ModalOverlay, useDisclosure, ModalContent, ModalBody, ModalCloseButton, ModalHeader, Text, FormControl, FormLabel, Input, FormErrorMessage, Flex } from '@chakra-ui/react'

const TableModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(3, 'Too Short!')
      .max(120, 'Too Long!')
      .required('Required'),
  })

  return (
    <div>
      <Button colorScheme='green' onClick={onOpen}>Add Table</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new table</ModalHeader>
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
                  <Field name='number'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.number && form.touched.number}>
                        <FormLabel>Number</FormLabel>
                        <Input {...field} placeholder='4' type="number" />
                        <FormErrorMessage>{form.errors.number}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                      Add Table
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TableModal