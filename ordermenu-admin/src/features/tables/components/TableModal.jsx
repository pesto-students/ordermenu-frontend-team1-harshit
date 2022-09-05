import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
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
import axios from "axios"
import config from "../../../config"

const TableModal = ({ setTables }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const CategorySchema = Yup.object().shape({
    tableNumber: Yup.number().min(1, "Too Short!").required("Required"),
  })

  return (
    <div>
      <Button colorScheme="green" onClick={onOpen}>
        Add Table
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new table</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ tableNumber: "" }}
              validationSchema={CategorySchema}
              onSubmit={async (values, actions) => {
                // setTimeout(() => {
                //   alert(JSON.stringify(values, null, 2))
                // actions.setSubmitting(false)
                // }, 1000)
                // console.log(values)
                try {
                  const { status, data } = await axios.post(
                    `${config.URL}/api/v1/tables`,
                    { number: values.tableNumber },
                    { withCredentials: true }
                  )
                  if (status === 200) {
                    console.log(data)
                    onClose()
                  }
                } catch (err) {
                  console.log(err)
                  onClose()
                }
              }}
            >
              {(props) => (
                <Form>
                  <Field name="tableNumber">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.tableNumber && form.touched.tableNumber
                        }
                      >
                        <FormLabel>Number</FormLabel>
                        <Input {...field} placeholder="4" type="tableNumber" />
                        <FormErrorMessage>
                          {form.errors.tableNumber}
                        </FormErrorMessage>
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
