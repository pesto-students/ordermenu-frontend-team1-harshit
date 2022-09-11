import React from "react"
import { Box, ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import BaseRoutes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Box bg='gray.50' minHeight='100vh'>
            <BaseRoutes />
          </Box>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
