import React from "react"
import { Box, ChakraProvider, createStandaloneToast } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import BaseRoutes from "./routes"

const { ToastContainer, toast } = createStandaloneToast()

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Box bg='gray.50' minHeight='100vh'>
            <BaseRoutes />
            <ToastContainer />
          </Box>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export const notification = toast;
export default App
