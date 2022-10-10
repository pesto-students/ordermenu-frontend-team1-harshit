import React, { useEffect, useState } from "react"
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
  Image,
  Select,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from "../../../apis/"
import { addProductAction, updateProductAction } from "../../../store/productSlice"
import OtherOptions from "./OtherOptions"
import { selectCategory } from "../../../store/categorySlice"

const ProductModal = ({ type, isEditing, setIsEditing, product }) => {
  const dispatch = useDispatch()
  const { categories } = useSelector(selectCategory)
  const [sizes, setSizes] = useState([])
  const [extra, setExtra] = useState([])
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure(type === "EDIT" ? {
    isOpen: isEditing, onOpen: () => setIsEditing(true), onClose: () => {
      setIsEditing(false)
      setSizes([]);
      setExtra([]);
      setImage(null);
    }
  } : {})

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(3, "Too Short!")
      .max(120, "Too Long!")
      .required("Required"),
    category: Yup.string()
      .required("Required"),
    price: Yup.number()
      .min(1, "Too low!")
      .required("Required"),
  })


  const onImageChange = async (event) => {
    try {
      setIsLoading(true)
      const tempFiles = event.target.files;
      if (tempFiles && tempFiles[0]) {
        const { url } = await uploadFile(tempFiles[0])
        setImage(url)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }



  useEffect(() => {
    if (type === "EDIT") {
      if (product?.sizes)
        setSizes(product?.sizes)

      if (product?.extra)
        setExtra(product?.extra)
    } else {
      setSizes([])
      setExtra([])
    }
  }, [type, setSizes, setExtra, product?.sizes, product?.extra])

  return (
    <Box>
      {
        type === "EDIT" ? '' : <Button colorScheme="green" onClick={onOpen}>
          Add Product
        </Button>
      }


      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxHeight={"90vh"}>
          <ModalHeader>{type === "EDIT" ? "Edit" : "Add a new"} product</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY='scroll'>
            <Text></Text>
            <Formik
              initialValues={type === "EDIT" ? { name: product?.name, description: product?.description, image: product?.image, price: product?.price, category: product?.category } : {
                name: "",
                description: "",
                image: "",
                price: "",
                category: ""
              }}
              validationSchema={ProductSchema}
              onSubmit={(values, actions) => {
                values.image = image
                if (type === "EDIT") {
                  dispatch(updateProductAction({ productId: product._id, product: { ...values, sizes, extra } }))
                } else {
                  dispatch(addProductAction({ ...values, sizes, extra }))
                }
                setImage('')
                onClose()
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
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                        mt={4}
                      >
                        <FormLabel>Image</FormLabel>
                        <Input
                          // {...field}
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={onImageChange}
                        />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {
                    image && <Box my={4}>
                      <FormLabel>Image Preview</FormLabel>
                      <Image src={image} alt={''} />
                    </Box>
                  }
                  <Field name="price">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.price && form.touched.price}
                        mt={4}
                      >
                        <FormLabel>Price</FormLabel>
                        <Input {...field} placeholder="450" type="number" />
                        <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="category">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.category && form.touched.category}
                        mt={4}
                      >
                        <FormLabel>Category</FormLabel>
                        <Select {...field} placeholder='Select category'>
                          {
                            categories?.map(category => <option id={category?._id}>{category?.name}</option>)
                          }

                        </Select>
                        <FormErrorMessage>{form.errors.category}</FormErrorMessage>
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
                  <OtherOptions fieldName="Size" options={sizes} setOptions={setSizes} />
                  <OtherOptions fieldName="Extra" options={extra} setOptions={setExtra} />
                  <Flex justify={"end"} mb={4} mt={6}>
                    <Button mr={4} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      isLoading={props.isSubmitting || isLoading}
                      onClick={() => {
                        setSizes([]);
                        setExtra([]);
                        props.submitForm();
                      }}
                    >
                      {type === "EDIT" ? "Edit " : "Add "}
                      Product
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
