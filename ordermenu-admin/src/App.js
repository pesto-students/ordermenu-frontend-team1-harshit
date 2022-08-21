import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import BaseRoutes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <BaseRoutes />
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
