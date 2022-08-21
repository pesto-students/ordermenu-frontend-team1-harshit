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
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react"
import propTypes from "prop-types"

function RestauratDetails({
  restName,
  setRestName,
  tagline,
  setTagline,
  location,
  setLocation,
  description,
  setDescription,
  handleNext,
}) {
  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Restaurant Details
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={5}>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Name"}
          </Text>
          <Input
            type="text"
            placeholder="Yolo Cafe"
            bg="white"
            mb={4}
            value={restName}
            onChange={(e) => setRestName(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Restaurant's Tagline"}
          </Text>
          <Input
            type="text"
            placeholder="You only live once"
            bg="white"
            mb={4}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </GridItem>
      </Grid>
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Location"}
      </Text>
      <Input
        type="text"
        placeholder="48, Scheme No. 54, Indore, Madhya Pradesh, India"
        bg="white"
        mb={9}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Text fontSize="md" md="1" color="gray.700" mb={1}>
        {"Restaurant's Description"}
      </Text>
      <Textarea
        placeholder="This particular coffee shop is not a cafe, it's a coffee shop literally. They sell the finest coffee from all over the world."
        bg="white"
        mb={6}
        resize={"none"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
            onClick={handleNext}
          >
            {"Next ->"}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

function OwnerDetails({
  fname,
  setFname,
  lname,
  setLname,
  email,
  setEmail,
  phone,
  setPhone,
  handleNext,
}) {
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
            mb={4}
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </GridItem>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Last Name"}
          </Text>
          <Input
            type="text"
            placeholder="Doe"
            bg="white"
            mb={4}
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </GridItem>
        <GridItem mr={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Phone Number"}
          </Text>
          <Input
            type="number"
            placeholder="+91 8989475133"
            bg="white"
            mb={4}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            {"Email"}
          </Text>
          <Input
            type="email"
            placeholder="hello@yolocafe.in"
            bg="white"
            mb={4}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            onClick={handleNext}
          >
            {"Next ->"}
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

function Verify() {
  return (
    <>
      <Heading as="h2" size="md" mb={3}>
        Verify Email & Phone Number
      </Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={0} mb={5}>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={3}>
            {"Enter OTP send to your Email Id"}
          </Text>
          <HStack>
            <PinInput type="numeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </GridItem>
        <GridItem mb={6}>
          <Text fontSize="md" md="1" color="gray.700" mb={3}>
            {"Enter OTP send to your Phone Number"}
          </Text>
          <HStack>
            <PinInput type="numeric">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
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
  const [restName, setRestName] = useState("")
  const [tagline, setTagline] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function handleNext() {
    if (stage === "RDETAILS") {
      // verify restname, tagline, location, description
      return setStage("ODETAILS")
    }

    if (stage === "ODETAILS") {
      // verify fname, lname, email, phone
      return setStage("VERIFY")
    }
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
              restName={restName}
              setRestName={setRestName}
              tagline={tagline}
              setTagline={setTagline}
              location={location}
              setLocation={setLocation}
              description={description}
              setDescription={setDescription}
              handleNext={handleNext}
            />
          )}
          {stage === "ODETAILS" && (
            <OwnerDetails
              fname={fname}
              setFname={setFname}
              lname={lname}
              setLname={setLname}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              handleNext={handleNext}
            />
          )}
          {stage === "VERIFY" && <Verify />}
        </Box>
      </Center>
    </HomeImage>
  )
}

RestauratDetails.propTypes = {
  restName: propTypes.string,
  setRestName: propTypes.func,
  tagline: propTypes.string,
  setTagline: propTypes.func,
  location: propTypes.string,
  setLocation: propTypes.func,
  description: propTypes.string,
  setDescription: propTypes.func,
  handleNext: propTypes.func,
}

OwnerDetails.propTypes = {
  fname: propTypes.string,
  setFname: propTypes.func,
  lname: propTypes.string,
  setLname: propTypes.func,
  email: propTypes.string,
  setEmail: propTypes.func,
  phone: propTypes.string,
  setPhone: propTypes.func,
  handleNext: propTypes.func,
}
