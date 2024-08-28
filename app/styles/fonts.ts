import { Roboto, Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: "700",
});

export const fonts = {
  firaSans,
  roboto,
};
