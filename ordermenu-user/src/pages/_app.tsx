import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "react-query/devtools";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";

import { customTheme } from "../styles/theme";
import { Header } from "src/components/";
import { wrapper } from "src/store/store";
import { setAuthState } from "src/store/authSlice";
import { useEffect } from "react";
import '../styles/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      dispatch(setAuthState(true))
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider >
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider >
  );
}

export default wrapper.withRedux(MyApp);
