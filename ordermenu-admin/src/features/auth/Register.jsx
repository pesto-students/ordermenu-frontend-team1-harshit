import React, { useState } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, HStack, Input, PinInput, PinInputField, Text, Textarea } from '@chakra-ui/react'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { signup, verifyOtp } from '../../apis'
import { setIsAuthenticated } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

const Register = () => {
  const [step, setStep] = useState(1)
  const [partner, setPartner] = useState({})
  const [userId, setUserId] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const PartnerSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(3)
      .max(120)
      .required(),
    tagline: Yup
      .string()
      .min(3)
      .max(120)
      .required(),
    description: Yup
      .string()
      .min(3)
      .max(240)
      .required(),
    address: Yup
      .string()
      .min(3)
      .max(120)
      .required()
  })

  const OwnerSchema = Yup.object().shape({
    firstName: Yup
      .string()
      .min(3)
      .max(120)
      .required(),
    lastName: Yup
      .string()
      .min(3)
      .max(120)
      .required(),
    phone: Yup
      .string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
      .min(10)
      .max(10)
      .required(),
    email: Yup
      .string()
      .email()
      .required()
  })

  const OtpSchema = Yup.object().shape({
    otp: Yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits')
  })

  return (
    <Flex height='100vh' width='100%' justify='center'>
      <Box width={{ base: '0%', lg: '50%' }} backgroundImage={"url('https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"} backgroundRepeat="no-repeat" backgroundSize="cover" objectFit='cover' objectPosition='center center' height='100%'>
      </Box>
      <Flex justify='center' align='center' width={{ base: '100%', lg: '50%' }}>
        <Box width={{ base: '100%', md: '40rem' }} p={4} height={{ md: "80vh" }}>
          <Text fontSize='2xl' fontWeight='bold' mb={4}>Partner with us</Text>

          <Grid gridTemplateColumns='repeat(3, 1fr)' gap={4} mb={8}>
            <GridItem>
              <Box width="100%" height={1} bg="green.400" />
              <Text fontSize="sm" mt={2} color="green.500">Restaurant Details</Text>
            </GridItem>
            <GridItem>
              <Box width="100%" height={1} bg={step === 2 || step === 3 ? "green.400" : "gray.200"} />
              <Text fontSize="sm" mt={2}>Owner Details</Text>
            </GridItem>
            <GridItem>
              <Box width="100%" height={1} bg={step === 3 ? "green.400" : "gray.200"} />
              <Text fontSize="sm" mt={2}>Verify Otp</Text>
            </GridItem>
          </Grid>

          {
            step === 1 && <>
              <Text fontSize='lg' fontWeight='bold' mb={4}>Restaurant Details</Text>
              <Formik
                initialValues={{ name: '', tagline: '', description: '', address: '' }}
                validationSchema={PartnerSchema}
                onSubmit={async (values, actions) => {
                  setPartner(values)
                  setStep(2)
                }}
              >
                {(props) => (
                  <Form>
                    <Flex gap={4}>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel>Partner Name</FormLabel>
                            <Input {...field} placeholder="Cafe Delight" />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="tagline">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.tagline && form.touched.tagline}
                          >
                            <FormLabel>Partner Tagline</FormLabel>
                            <Input {...field} placeholder="Eat well and treat well." />
                            <FormErrorMessage>{form.errors.tagline}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <Field name="address">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.address && form.touched.address}
                        >
                          <FormLabel mt={4}>Partner Location</FormLabel>
                          <Input {...field} placeholder="Scheme No. 78, Indore" />
                          <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.description && form.touched.description}
                        >
                          <FormLabel mt={4}>Partner Description</FormLabel>
                          <Textarea {...field} placeholder="Scheme No. 78, Indore" />
                          <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex gap={4} mt={6} justify='space-between' align='center'>
                      <Button
                        colorScheme="green"
                        variant='ghost'
                        _hover={{ background: 'none' }}
                        onClick={() => navigate('/login')}
                      >
                        Already have an account?
                      </Button>
                      <Button
                        colorScheme="green"
                        isLoading={props.isSubmitting}
                        type="submit"
                        px={8}
                      >
                        Next <FiArrowRight />
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik></>
          }

          {
            step === 2 && <>
              <Text fontSize='lg' fontWeight='bold' mb={4}>Owner Details</Text>
              <Formik
                initialValues={{ firstName: '', lastName: '', phone: '', email: '' }}
                validationSchema={OwnerSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await signup({ partner, user: values })

                    if (response.ownerId) {
                      setUserId(response.ownerId)
                      setStep(3)
                    }
                  } catch (error) {
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Flex gap={4} >
                      <Field name="firstName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.firstName && form.touched.firstName}
                          >
                            <FormLabel>First Name</FormLabel>
                            <Input {...field} placeholder="John" />
                            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.lastName && form.touched.lastName}
                          >
                            <FormLabel>Last Name</FormLabel>
                            <Input {...field} placeholder="Doe" />
                            <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <Flex gap={4} mt={4}>
                      <Field name="phone">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.phone && form.touched.phone}
                          >
                            <FormLabel>Phone Number</FormLabel>
                            <Input {...field} type='number' placeholder="8989475132" />
                            <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel>Email</FormLabel>
                            <Input {...field} type="email" placeholder="hello@cafe.in" />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>


                    <Flex gap={4} mt={6} justify='flex-end' align='center'>
                      <Button
                        colorScheme="green"
                        isLoading={props.isSubmitting}
                        type="submit"
                        px={8}
                      >
                        Next <FiArrowRight />
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik></>
          }

          {
            step === 3 && <>
              <Text fontSize='lg' fontWeight='bold' mb={4}>Verify Otp</Text>
              <Formik
                initialValues={{ otp: '' }}
                validationSchema={OtpSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await verifyOtp({ userId, otp: Number(values.otp) })

                    if (response.access) {
                      dispatch(setIsAuthenticated(true))
                      navigate('/dashboard')
                    }
                  } catch (error) {
                    actions.setErrors({ otp: 'Something went wrong.' })
                  }
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="otp">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.otp && form.touched.otp}
                        >
                          <FormLabel mb={4}>We've sent you an OTP on your phone number.</FormLabel>
                          <HStack>
                            <PinInput onChange={(val) =>
                              form.setFieldValue(field.name, val)} type='number'>
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                              <PinInputField />
                            </PinInput>
                          </HStack>
                          <FormErrorMessage>{form.errors.otp}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex gap={4} mt={6} justify='flex-end' align='center'>
                      <Button
                        colorScheme="green"
                        isLoading={props.isSubmitting}
                        type="submit"
                        px={8}
                      >
                        Verify OTP
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik></>
          }
        </Box>
      </Flex>
    </Flex>
  )
}

export default Register