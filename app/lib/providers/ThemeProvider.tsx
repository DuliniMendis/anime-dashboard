'use client'

import { ChakraProvider, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { cardAnatomy, menuAnatomy, modalAnatomy } from '@chakra-ui/anatomy'
import { colors } from '@/app/styles/colors'
import { fonts } from '@/app/styles/fonts'

const cardStyle = createMultiStyleConfigHelpers(cardAnatomy.keys)
const cardBaseStyle = cardStyle.definePartsStyle({
  container: {
    backgroundColor: colors.light,
  },
})

const menuStyle = createMultiStyleConfigHelpers(menuAnatomy.keys)
const menuBaseStyle = menuStyle.definePartsStyle({
  list: {
    bg: colors.light,
  },
  item: {
    bg: colors.light,
    color: colors.midDark,
    _hover: {
      bg: colors.midDark,
      color: colors.white,
    },
    border: 'none',
  },
  button: {
    bg: colors.light,
    color: colors.midDark,
    _hover: {
      bg: colors.midDark,
      color: colors.white,
    },
    border: 'none',
  },
})

const modalStyle = createMultiStyleConfigHelpers(modalAnatomy.keys)
const modalBaseStyle = modalStyle.definePartsStyle({
  content: {
    bg: colors.light,
  },
  header: {
    bg: colors.midDark,
    color: colors.dark,
  },
  body: {
    color: colors.midDark,
  },
  closeButton: {
    color: colors.midDark,
  },
})

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-firasans)',
    body: 'var(--font-roboto)',
  },
  styles: {
    global: {
      body: {
        bg: colors.dark,
        color: colors.white,
      },
      header: {
        bg: colors.midDark,
      },
      h1: {
        color: colors.mid,
      },
      input: {
        bg: colors.white,
        color: colors.midDark,
        _placeholder: {
          color: colors.mid,
        },
      },
    },
  },
  components: {
    Card: cardStyle.defineMultiStyleConfig({ baseStyle: cardBaseStyle }),
    Menu: menuStyle.defineMultiStyleConfig({ baseStyle: menuBaseStyle }),
    Modal: modalStyle.defineMultiStyleConfig({ baseStyle: modalBaseStyle }),
  },
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-firasans: ${fonts.firaSans.style.fontFamily};
            --font-roboto: ${fonts.roboto.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  )
}
