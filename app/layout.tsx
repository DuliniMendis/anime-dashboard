import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import { ThemeProvider } from "./lib/providers/ThemeProvider";
import { ApolloProvider } from "./lib/providers/ApolloProvider";
import { Header } from "./ui/Header";
import { Flex } from "@chakra-ui/react";
import { UserContextProvider } from "@/app/lib/providers/UserContextProvider";

const poppings = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"] });
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "AniRealm",
  description: "A simple app to keep track of your favorite anime and manga",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <ApolloProvider>
          <ThemeProvider>
            <UserContextProvider>
              <Flex direction="column" height="100vh">
                <Header />
                <Flex direction="column" flex="1" overflowY="auto">
                  {children}
                </Flex>
              </Flex>
              {modal}
            </UserContextProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
