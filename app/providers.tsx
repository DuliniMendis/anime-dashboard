"use client";

import {
  ChakraProvider,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { cardAnatomy, menuAnatomy, modalAnatomy } from "@chakra-ui/anatomy";
import { UserContextProvider } from "./context/userContext";

const cardStyle = createMultiStyleConfigHelpers(cardAnatomy.keys);
const cardBaseStyle = cardStyle.definePartsStyle({
  container: {
    backgroundColor: "#e4e4f0",
  },
});

const menuStyle = createMultiStyleConfigHelpers(menuAnatomy.keys);
const menuBaseStyle = menuStyle.definePartsStyle({
  list: {
    bg: "#e4e4f0",
  },
  item: {
    bg: "#e4e4f0",
    color: "#474F7A",
    _hover: {
      bg: "#474F7A",
      color: "white",
    },
    border: "none",
  },
  button: {
    bg: "#e4e4f0",
    color: "#474F7A",
    _hover: {
      bg: "#474F7A",
      color: "white",
    },
    border: "none",
  },
});

const modalStyle = createMultiStyleConfigHelpers(modalAnatomy.keys);
const modalBaseStyle = modalStyle.definePartsStyle({
  content: {
    bg: "#e4e4f0",
  },
  header: {
    bg: "#474F7A",
    color: "#1F2544",
  },
  body: {
    color: "#474F7A",
  },
  closeButton: {
    color: "#474F7A",
  },
});

const theme = extendTheme({
  styles: {
    global: {
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
      input: {
        bg: "white",
        color: "#474F7A",
        _placeholder: {
          color: "#81689D",
        },
      },
    },
  },
  components: {
    Card: cardStyle.defineMultiStyleConfig({ baseStyle: cardBaseStyle }),
    Menu: menuStyle.defineMultiStyleConfig({ baseStyle: menuBaseStyle }),
    Modal: modalStyle.defineMultiStyleConfig({ baseStyle: modalBaseStyle }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </UserContextProvider>
  );
}
