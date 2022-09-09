import React, { useState } from "react"
import HomeImage from "../common/HomeImage/HomeImage"
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Progress,
  Text,
  Center,
  Input,
  Textarea,
  Link,
  Button,
} from "@chakra-ui/react"
import propTypes from "prop-types"
import { useFormik } from "formik"
import config from "../../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useAuth } from "../../context/AuthContext"

function RestauratDetails({ handleNextRestaurantDetails }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      tagline: "",
      address: "",
      description: "",
    },

    onSubmit: (values) => {
      handleNextRestaurantDetails(values)
    },

    validate: (values) => {
      let errors = {}

      if (!values.name) errors.name = "Name cannot be blank"
      if (!values.tagline) errors.tagline = "Tagline cannot be blank"
      if (!values.address) errors.address = "Location cannot be blank"
      if (!values.description)
        errors.description = "Description cannot be blank"

      return errors
    },
  })

  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Restaurant Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={3}>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Name"}
          </Text>
          <Input
            type="text"
            placeholder="Yolo Cafe"
            bg="white"
            mb={formik.errors.name ? 1 : 5}
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.name}`}
            </Text>
          ) : null}
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Tagline"}
          </Text>
          <Input
            type="text"
            placeholder="You only live once"
            bg="white"
            mb={formik.errors.tagline ? 1 : 4}
            name="tagline"
            onBlur={formik.handleBlur}
            value={formik.values.tagline}
            onChange={formik.handleChange}
          />
          {formik.touched.tagline && formik.errors.tagline ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.tagline}`}
            </Text>
          ) : null}
        </GridItem>
      </Grid>
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Location"}
      </Text>
      <Input
        type="text"
        placeholder="48, Scheme No. 54, Indore, Madhya Pradesh, India"
        bg="white"
        mb={formik.errors.address ? 1 : 9}
        name="address"
        onBlur={formik.handleBlur}
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      {formik.touched.address && formik.errors.address ? (
        <Text fontSize="sm" md="1" color="red.400" mb={8}>
          {`*${formik.errors.address}`}
        </Text>
      ) : null}
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Description"}
      </Text>
      <Textarea
        placeholder="This particular coffee shop is not a cafe, it's a coffee shop literally. They sell the finest coffee from all over the world."
        bg="white"
        mb={formik.errors.description ? 1 : 4}
        resize={"none"}
        name="description"
        onBlur={formik.handleBlur}
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      {formik.touched.description && formik.errors.description ? (
        <Text fontSize="sm" md="1" color="red.400" mb={6}>
          {`*${formik.errors.description}`}
        </Text>
      ) : null}
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={4}>
        <GridItem>
          <Link
            color={"green.400"}
            fontSize="md"
            fontWeight="medium"
            mt={8}
            href="/login"
          >
            Already have a account
          </Link>
        </GridItem>
        <GridItem alignContent="center">
          <Button
            bg={"green.400"}
            color={"white"}
            width="70%"
            _hover={{ bg: "green.300" }}
            onClick={formik.handleSubmit}
          >
            {"Next ->"}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

function OwnerDetails({ handleNextOwnerDetails }) {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },

    onSubmit: (values) => {
      handleNextOwnerDetails(values)
    },

    validate: (values) => {
      let errors = {}

      if (!values.firstName) errors.firstName = "FirstName cannot be blank"
      if (!values.lastName) errors.lastName = "lastName cannot be blank"
      if (!values.phone) errors.phone = "Phone Number cannot be blank"
      else if (!/^\d{10}$/.test(values.phone))
        errors.phone = "Phone number must be a 10 digit number"
      if (!values.email) errors.email = "Email Id cannot be blank"
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address"
      }

      return errors
    },
  })
  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Owner Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={5}>
        <GridItem mr={6} mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"First Name"}
          </Text>
          <Input
            type="text"
            placeholder="John"
            bg="white"
            mb={formik.touched.firstName && formik.errors.firstName ? 1 : 4}
            name="firstName"
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.firstName}`}
            </Text>
          ) : null}
        </GridItem>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Last Name"}
          </Text>
          <Input
            type="text"
            placeholder="Doe"
            bg="white"
            mb={formik.touched.firstName && formik.errors.firstName ? 1 : 4}
            name="lastName"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.lastName}`}
            </Text>
          ) : null}
        </GridItem>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Phone Number"}
          </Text>
          <Input
            type="number"
            placeholder="+91 8989475133"
            bg="white"
            mb={formik.touched.phone && formik.errors.phone ? 1 : 4}
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.phone}`}
            </Text>
          ) : null}
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Email"}
          </Text>
          <Input
            type="email"
            placeholder="hello@yolocafe.in"
            bg="white"
            mb={formik.touched.email && formik.errors.email ? 1 : 4}
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.email}`}
            </Text>
          ) : null}
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={7}>
        <GridItem></GridItem>
        <GridItem alignContent="center" ml={12}>
          <Button
            bg={"green.400"}
            color={"white"}
            width="70%"
            _hover={{ bg: "green.300" }}
            onClick={formik.handleSubmit}
          >
            {"Next ->"}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

function Verify({ handleVerify }) {
  const formik = useFormik({
    initialValues: {
      otp: "",
    },

    onSubmit: (values) => {
      // handleNextOwnerDetails(values)
      // console.log(values)
      handleVerify(values.otp)
    },

    validate: (values) => {
      let errors = {}

      if (!values.otp) errors.otp = "OTP cannot be blank"
      return errors
    },
  })
  return (
    <>
      <Heading as="h2" size="md" mb={3} mt={12}>
        Verify Phone Number
      </Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={0} mb={5}>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={3}>
            {"Enter OTP send to your Phone Number"}
          </Text>
          <Input
            type="number"
            placeholder="001100"
            bg="white"
            mb={formik.touched.otp && formik.errors.otp ? 1 : 4}
            name="otp"
            value={formik.values.otp}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.otp && formik.errors.otp ? (
            <Text fontSize="sm" md="1" color="red.400" mb={4}>
              {`*${formik.errors.otp}`}
            </Text>
          ) : null}
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mt={7}>
        <GridItem></GridItem>
        <GridItem alignContent="center" ml={12}>
          <Button
            bg={"green.400"}
            color={"white"}
            width="70%"
            _hover={{ bg: "green.300" }}
            onClick={formik.handleSubmit}
          >
            {"Setup My Store"}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

export default function Register() {
  // Three states, RDETAILS, ODETAILS, VERIFY
  const [stage, setStage] = useState("RDETAILS")
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [ownerDetails, setOwnerDetails] = useState({})
  const { setAuthState } = useAuth()
  const navigate = useNavigate()

  function handleNextRestaurantDetails(value) {
    if (stage === "RDETAILS") {
      // verify name, tagline, location, description
      setRestaurantDetails(value)
      return setStage("ODETAILS")
    }
  }

  async function handleNextOwnerDetails(value) {
    if (stage === "ODETAILS") {
      // verify fname, lname, email, phone

      setOwnerDetails(value)
      try {
        const body = {
          partner: restaurantDetails,
          user: value,
        }
        const { data, status } = await axios.post(
          `${config.URL}/api/v1/partners`,
          body
        )
        if (status === 200) {
          console.log(data)
          // return setStage("VERIFY")
        }
      } catch (error) {
        console.log(error)
      }

      try {
        const { data, status } = await axios.post(
          `${config.URL}/api/v1/signin/admin`,
          {
            phone: value.phone,
          }
        )
        if (status === 200) {
          console.log(data)
          localStorage.setItem("id", data._id)
          return setStage("VERIFY")
        }
      } catch (error) {
        console.log(error)
      }
      // return setStage("VERIFY")
    }
  }

  const handleVerify = async (otp) => {
    try {
      const {
        data: { access },
        status,
      } = await axios.post(`${config.URL}/api/v1/verify-otp`, {
        userId: localStorage.getItem("id"),
        otp: Number(otp),
      })
      if (status === 200) {
        Cookies.set("accessToken", access.token, {
          expires: new Date(access.expires),
        })
        setAuthState({ type: "LOGIN", payload: localStorage.getItem("id") })
        navigate("/dashboard")
      }
    } catch (err) {
      const {
        response: { data },
      } = err
      if (data.code === 401) {
        console.log(data.message)
      }
    }
    console.log(otp)
  }

  return (
    <HomeImage>
      <Center>
        <Box mt="10vh" width={["85vw", "85vw", "45vw", "45vw", "45vw", "40vw"]}>
          <Heading as="h2" size="lg" mb={10}>
            Partner with us
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={0} mb={5}>
            <GridItem>
              <Progress
                colorScheme="green"
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem ml={6}>
              <Progress
                colorScheme={stage !== "RDETAILS" ? "green" : "gray"}
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem ml={6}>
              <Progress
                colorScheme={stage === "VERIFY" ? "green" : "gray"}
                height="7px"
                value={99}
                borderRadius="md"
              />
            </GridItem>
            <GridItem mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Restaurant Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
            <GridItem ml={6} mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Owner Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
            <GridItem ml={6} mt={4}>
              <Heading as="h4" size="sm" mb={1}>
                Verify Details
              </Heading>
              <Text fontSize="sm">Title to this step</Text>
            </GridItem>
          </Grid>

          {stage === "RDETAILS" && (
            <RestauratDetails
              handleNextRestaurantDetails={handleNextRestaurantDetails}
            />
          )}
          {stage === "ODETAILS" && (
            <OwnerDetails handleNextOwnerDetails={handleNextOwnerDetails} />
          )}
          {stage === "VERIFY" && <Verify handleVerify={handleVerify} />}
        </Box>
      </Center>
    </HomeImage>
  )
}

RestauratDetails.propTypes = {
  handleNextRestaurantDetails: propTypes.func,
}

OwnerDetails.propTypes = {
  handleNextOwnerDetails: propTypes.func,
}
