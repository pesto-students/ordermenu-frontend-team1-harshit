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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { addTableAction } from "../../../store/tableSlice"

const TableModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const TableSchema = Yup.object().shape({
    number: Yup.number().min(1, "Too Short!").required("Required"),
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
              initialValues={{ number: "" }}
              validationSchema={TableSchema}
              onSubmit={async (values, actions) => {
                dispatch(addTableAction(values))
                onClose()
              }}
            >
              {(props) => (
                <Form>
                  <Field name="number">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.number && form.touched.number
                        }
                      >
                        <FormLabel>Number</FormLabel>
                        <Input {...field} placeholder="4" type="number" />
                        <FormErrorMessage>
                          {form.errors.number}
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
