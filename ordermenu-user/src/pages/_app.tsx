import { AppProps } from "next/app";
import { Box, ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "react-query/devtools";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";

import { customTheme } from "../styles/theme";
import { Header } from "../components/";
import { wrapper } from "../store/store";
import { setAuthState } from "../store/authSlice";
import { useEffect } from "react";
import '../styles/styles.css'

const { ToastContainer, toast } = createStandaloneToast()

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()



  useEffect(() => {
    if (Cookies.get('accessToken')) {
      dispatch(setAuthState(true))
    }
  }, [dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <Header />
        <Box pt="4rem">
          <Component {...pageProps} />
        </Box>
        <ToastContainer />
      </ChakraProvider >
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider >
  );
}

export const notification = toast

export default wrapper.withRedux(MyApp);
