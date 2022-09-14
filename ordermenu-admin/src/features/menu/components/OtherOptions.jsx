import React from 'react'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react"

const OtherOptions = ({ fieldName, options, setOptions }) => {

  const OptionSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    price: Yup.number()
      .min(0, "Too low!")
      .required("Required"),
  })

  const removeOption = (name) => {
    const newOptions = [...options]
    const index = newOptions?.findIndex(opt => opt.name === name)
    if (index > -1) {
      newOptions.splice(index, 1)
      setOptions(newOptions)
    }
  }

  return (
    <Formik
      initialValues={{ name: "", price: "" }}
      validationSchema={OptionSchema}
      onSubmit={(values, actions) => {
        const index = options.findIndex(option => option.name === values.name)

        if (index < 0) {
          setOptions([...options, values])
          actions.resetForm()
        } else {
          actions.setErrors({
            name: "Option name already exist!"
          }
          )
        }
      }}
    >
      {(props) => (
        <Form>
          <FormLabel mt={4}>{fieldName}</FormLabel>

          <Stack gap={1}>
            {options?.map(option => <Flex key={option?.name} justify="space-between" align="center">
              <Text fontWeight="semibold" >{option?.name} - ₹ {option?.price}</Text>
              <Button colorScheme="red"
                variant={"ghost"} size="sm" onClick={() => removeOption(option?.name)}>X</Button>
            </Flex>)}

          </Stack>
          <Flex
            justify={"space-between"}
            align="baseline"
            gap={4}
          >
            <Field name="name">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.name && form.touched.name
                  }
                >
                  <Input {...field} placeholder="Regular" />
                  <FormErrorMessage>
                    {form.errors.name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="price">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.price && form.touched.price
                  }
                  mt={4}
                >
                  <Input
                    {...field}
                    placeholder="0"
                    type="number"
                  />
                  <FormErrorMessage>
                    {form.errors.price}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="green"
              variant={"outline"}
              onClick={() => props.submitForm()}
            >
              Add
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default OtherOptions