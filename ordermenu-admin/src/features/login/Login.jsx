import React, { useState } from "react"
import { Grid, GridItem, Input, Button, Checkbox, Link } from "@chakra-ui/react"
import { Box, Center, Text, Heading } from "@chakra-ui/layout"

// import { validateEmail, validatePassword } from "../utils/index"
import HomeImage from "../common/HomeImage/HomeImage"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)

  const handleSignIn = () => {
    // validateEmail(email)
    // validatePassword(password)
  }

  return (
    <HomeImage>
      <Center>
        <Box mt="25vh" width={["60vw", "60vw", "40vw", "30vw", "25vw"]}>
          <Heading as="h2" size="xl" mb={10}>
            Welcome Back
          </Heading>
          <Text fontSize="md" md="1" color="gray.700" mb={1}>
            Email
          </Text>
          <Input
            type="email"
            placeholder="hello@yolocafe.in"
            bg="white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Text fontSize="md" color="gray.700" mb={1}>
            Password
          </Text>
          <Input
            type="password"
            placeholder="You only live once."
            bg="white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={2}
          />
          <Grid templateColumns="repeat(2, 1fr)" gap={0} mb={5}>
            <GridItem>
              <Checkbox
                size="sm"
                defaultChecked={remember}
                color={"gray.600"}
                onChange={(e) => setRemember(e.target.checked)}
              >
                Remember me
              </Checkbox>
            </GridItem>
            <GridItem alignContent="center">
              <Link color={"green.400"} fontSize="sm">
                Forgot Password?
              </Link>
            </GridItem>
          </Grid>
          <Button
            bg={"green.400"}
            color={"white"}
            width="100%"
            _hover={{ bg: "green.300" }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Center>
    </HomeImage>
  )
}
