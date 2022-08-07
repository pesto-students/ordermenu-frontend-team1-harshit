import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from "react-router-dom";

import SidebarWithHeader from './features/common/SidebarWithHeader/SidebarWithHeader';
import BaseRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <SidebarWithHeader>
          <BaseRoutes />
        </SidebarWithHeader>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
