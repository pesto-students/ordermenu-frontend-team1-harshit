import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import BaseRoutes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <BaseRoutes />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
