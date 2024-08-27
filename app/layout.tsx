import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ApolloWrapper } from "./ApolloWrapper";
import { Header } from "./ui/Header";
import { auth } from "@/auth";
import { UserContextProvider } from "./context/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AniRealm",
  description: "A simple app to keep track of your favorite anime and manga",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();
  console.log({ session });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <Providers>
            <UserContextProvider>
              <Header />
              {children}
              {modal}
            </UserContextProvider>
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
