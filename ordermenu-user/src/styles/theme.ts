import { extendTheme, theme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b"
    },
  },
  fonts: {
    body: "Roboto",
    heading: "Roboto",
  },
  styles: {
    global: {
      body: {
        background: 'gray.50'
      }
    }
  }
});
