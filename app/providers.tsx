"use client";

import {
  ChakraProvider,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "#e4e4f0",
  },
});

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#1F2544",
        color: "white",
      },
      header: {
        bg: "#474F7A",
      },
      h1: {
        color: "#81689D",
      },
      img: {
        borderRadius: "md",
        border: "1px solid white",
      },
    },
  },
  components: {
    Card: defineMultiStyleConfig({ baseStyle }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
