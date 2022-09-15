import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Image, Input, Text, useBreakpointValue } from '@chakra-ui/react'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'

import { uploadFile } from "../../apis/"
import { selectPartner, updatePartnerAction } from '../../store/partnerSlice'

const RestaurantDetailsPage = () => {
  const dispatch = useDispatch()
  const { partner } = useSelector(selectPartner)

  const [logo, setLogo] = useState(null)
  const [background, setBackground] = useState(null)

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    address: Yup.string()
      .min(3, "Too Short!")
      .max(120, "Too Long!")
      .required("Required"),
    tagline: Yup.string()
      .min(3, "Too Short!")
      .max(60, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(3, "Too Short!")
      .max(120, "Too Long!")
      .required("Required"),
  })

  const onLogoChange = async (event) => {
    const tempFiles = event.target.files;
    if (tempFiles && tempFiles[0]) {

      const { url } = await uploadFile(tempFiles[0])
      setLogo(url)
    }
  }

  const onBackgroundChange = async (event) => {
    const tempFiles = event.target.files;
    if (tempFiles && tempFiles[0]) {

      const { url } = await uploadFile(tempFiles[0])
      setBackground(url)
    }
  }

  useEffect(() => {
    setLogo(partner.logo)
    setBackground(partner.background)
  }, [partner.logo, partner.background])


  return (
    <Flex align="center" justify="center" flex={1}>
      <Box bg={'white'} width={useBreakpointValue({ base: "100%", md: "50%" })} p={useBreakpointValue({ base: 2, md: 4 })} borderRadius={8}>
        <Text fontSize="lg" fontWeight="bold" pb={2}>Update Partner Details</Text>
        <Formik
          initialValues={{ name: partner.name, description: partner.description, tagline: partner.tagline, address: partner.address, logo: partner.logo, background: partner.background, }}
          validationSchema={CategorySchema}
          onSubmit={async (values, actions) => {
            values.logo = logo;
            values.background = background;

            dispatch(updatePartnerAction({ partnerId: partner._id, partner: values }))
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
                    <Input {...field} placeholder="Cafe" />
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
              <Field name="tagline">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.tagline && form.touched.tagline
                    }
                    mt={4}
                  >
                    <FormLabel>Tagline</FormLabel>
                    <Input
                      {...field}
                      placeholder="You only live once."
                    />
                    <FormErrorMessage>
                      {form.errors.tagline}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.address && form.touched.address
                    }
                    mt={4}
                  >
                    <FormLabel>Address</FormLabel>
                    <Input
                      {...field}
                      placeholder="Scheme No. 78, Indore, Madhya Pradesh, India"
                    />
                    <FormErrorMessage>
                      {form.errors.address}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="logo"  >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.logo && form.touched.logo}
                    mt={4}
                  >
                    <FormLabel>Logo</FormLabel>
                    <Input
                      // {...field}
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={onLogoChange}
                      paddingTop={1}
                    />
                    <FormErrorMessage>{form.errors.logo}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {
                logo && <Box my={4}>
                  <FormLabel>Logo Preview</FormLabel>
                  <Image src={logo} alt={'logo'} />
                </Box>
              }
              <Field name="background"  >
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.background && form.touched.background}
                    mt={4}
                  >
                    <FormLabel>Background Image</FormLabel>
                    <Input
                      // {...field}
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={onBackgroundChange}
                      paddingTop={1}
                    />
                    <FormErrorMessage>{form.errors.background}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {
                background && <Box my={4}>
                  <FormLabel>Background Preview</FormLabel>
                  <Image src={background} alt={'background'} />
                </Box>
              }

              <Flex justify={"end"} mb={4}>
                <Button
                  mt={4}
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Update Details
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default RestaurantDetailsPage