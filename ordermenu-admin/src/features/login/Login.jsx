import React, { useState } from "react"
import { Input, Button } from "@chakra-ui/react"
import { Box, Center, Text, Heading } from "@chakra-ui/layout"
import config from "../../config"

// import { validateEmail, validatePassword } from "../utils/index"
import HomeImage from "../common/HomeImage/HomeImage"
import { useAuth } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useEffect } from "react"

export default function Login() {
  const [error, setError] = useState("")
  const [userId, setUserId] = useState("")
  const [otpSend, setOtpSend] = useState(false)
  const { authState, setAuthState } = useAuth()
  let navigate = useNavigate()

  useEffect(() => {
    if (authState.userLoggedIn) return navigate("/dashboard")
    if (Cookies.get("accessToken") !== undefined) {
      setAuthState({ type: "LOGIN", payload: localStorage.getItem("id") })
      navigate("/dashboard")
    }
  }, [])

  const handleError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError("")
    }, 4000)
  }

  const handleSendOtp = async (phone) => {
    // Verify number
    if (phone.length === 0) {
      handleError("Enter phone number")
      return
    } else if (phone.length !== 10) {
      handleError("Phone number not correct")
      return
    }
    try {
      const { data, status } = await axios.post(`${config.URL}/api/v1/signin`, {
        phone: phone,
      })
      if (status === 200) {
        setUserId(data._id)
        setOtpSend(true)
      }
    } catch (err) {
      const {
        response: { data },
      } = err
      if (data.code === 404) {
        handleError(data.message)
      }
    }
  }

  const handleLogin = async (otp) => {
    // Verify otp
    if (otp.length === 0) {
      handleError("OTP cannot be left empty")
      return
    }
    try {
      const {
        data: { access },
        status,
      } = await axios.post(`${config.URL}/api/v1/verify-otp`, {
        userId: userId,
        otp: Number(otp),
      })
      if (status === 200) {
        Cookies.set("accessToken", access.token, {
          expires: new Date(access.expires),
        })
        localStorage.setItem("id", userId)
        setAuthState({ type: "LOGIN", payload: userId })
        navigate("/dashboard")
      }
    } catch (err) {
      const {
        response: { data },
      } = err
      if (data.code === 401) {
        handleError(data.message)
      }
    }
  }

  const PhoneInput = ({ handleSendOtp, error }) => {
    const [phone, setPhone] = useState("")

    return (
      <>
        <Text fontSize="md" md="1" color="gray.700" mb={1}>
          Phone Number
        </Text>
        <Input
          type="number"
          placeholder="+91 8989475133"
          bg="white"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          // mb={4}
          mb={error ? 1 : 5}
        />
        <Text fontSize="sm" md="1" color="red.700" mb={4} ml={2}>
          {error ? `*${error}` : ""}
        </Text>
        <Button
          bg={"green.400"}
          color={"white"}
          width="100%"
          _hover={{ bg: "green.300" }}
          onClick={() => handleSendOtp(phone)}
        >
          Send OTP
        </Button>
      </>
    )
  }

  const OTPInput = ({ handleLogin }) => {
    const [otp, setOtp] = useState("")

    return (
      <>
        <Text fontSize="md" md="1" color="gray.700" mb={1}>
          One Time Password
        </Text>
        <Input
          type="number"
          placeholder="123456"
          bg="white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          // mb={4}
          mb={error ? 1 : 5}
        />
        <Text fontSize="sm" md="1" color="red.700" mb={4} ml={2}>
          {error ? `*${error}` : ""}
        </Text>
        <Button
          bg={"green.400"}
          color={"white"}
          width="100%"
          _hover={{ bg: "green.300" }}
          onClick={() => handleLogin(otp)}
        >
          Verify OTP
        </Button>
      </>
    )
  }

  return (
    <HomeImage>
      <Center>
        <Box mt="25vh" width={["60vw", "60vw", "40vw", "30vw", "25vw"]}>
          <Heading as="h2" size="xl" mb={10}>
            Welcome Back
          </Heading>
          {otpSend ? (
            <OTPInput handleLogin={handleLogin} />
          ) : (
            <PhoneInput handleSendOtp={handleSendOtp} error={error} />
          )}
        </Box>
      </Center>
    </HomeImage>
  )
}
