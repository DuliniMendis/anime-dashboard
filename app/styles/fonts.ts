import { Quicksand, Fira_Sans } from 'next/font/google'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400'],
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: '400',
})

export const fonts = {
  heading: firaSans,
  body: quicksand,
}
