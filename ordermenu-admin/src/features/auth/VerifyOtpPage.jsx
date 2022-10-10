import React from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, PinInput, PinInputField, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin, verifyOtp } from '../../apis'
import { setIsAuthenticated } from '../../store/authSlice'

const VerifyOtpPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!location.state._id) {
    navigate('/')
  }

  const OtpSchema = Yup.object().shape({
    otp: Yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits')
  })

  return (
    <Flex height='100vh'>
      <Box width={{ base: '0%', lg: '50%' }} backgroundImage={"url('https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"} backgroundRepeat="no-repeat" backgroundSize="cover" objectFit='cover' objectPosition='center center' height='100%'>
      </Box>
      <Flex justify='center' align='center' width={{ base: '100%', lg: '50%' }}>
        <Box width={{ base: '100%', md: '20rem' }} p={4} >
          <Text fontSize='xl' fontWeight='bold' mb={4}>Welcome Back</Text>
          <Formik
            initialValues={{ otp: '123456' }}
            validationSchema={OtpSchema}
            onSubmit={async (values, actions) => {
              const response = await verifyOtp({ userId: location.state._id, otp: Number(values.otp) })
              if (response) {
                dispatch(setIsAuthenticated(true))
                navigate('/dashboard')
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
                      <FormLabel mb={1}>Enter OTP</FormLabel>
                      <Text fontSize="xs" color='gray.500' mb={2}>We've sent you an otp on your phone. <Button size='xs' variant='link' colorScheme='green' onClick={() => signin({ phone: location.state.phone })}>Resend</Button> </Text>
                      <HStack>
                        <PinInput onChange={(val) =>
                          form.setFieldValue(field.name, val)} type='number' defaultValue='123456'>
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

                <Button
                  mt={4}
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width='100%'
                >
                  Verify OTP
                </Button>
              </Form>
            )}
          </Formik>

        </Box>
      </Flex>
    </Flex >
  )
}

export default VerifyOtpPage