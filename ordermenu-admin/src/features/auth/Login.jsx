import React from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { signin } from '../../apis'

const Login = () => {
  const navigate = useNavigate()

  const LoginSchema = Yup.object().shape({
    phone: Yup
      .string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
      .min(10)
      .max(10)
      .required()
  })

  return (
    <Flex height='100vh'>
      <Box width={{ base: 'none', md: "50%" }} backgroundImage={"url('https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"} backgroundRepeat="no-repeat" backgroundSize="cover" objectFit='cover' objectPosition='center center' height='100%'>
      </Box>
      <Flex justify='center' align='center' width={{ base: '100%', md: "50%" }} p={4}>
        <Box width={{ base: '100%', md: '20rem' }}>
          <Text fontSize='lg' fontWeight='bold' mb={4}>Welcome Back</Text>
          <Formik
            initialValues={{ phone: '9879879879' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, actions) => {
              try {
                const response = await signin(values)
                if (response._id) {
                  navigate('/verify-otp', { state: response })
                }
              } catch (error) {
                if (error.status === 404) {
                  actions.setErrors({ phone: 'Please create your account to login.' })
                } else {
                  actions.setErrors({ phone: 'Something went wrong.' })
                }
              }
            }}
          >
            {(props) => (
              <Form>
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

                <Button
                  mt={4}
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  type="submit"
                  width='100%'
                >
                  Send OTP
                </Button>
                <Button
                  mt={2}
                  size="sm"
                  colorScheme="green"
                  variant="ghost"
                  width='100%'
                  _hover={{ background: 'none' }}
                  onClick={() => navigate('/register')}
                >
                  I don't have an account?
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Flex >
  )
}

export default Login