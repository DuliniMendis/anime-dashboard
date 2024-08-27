import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ApolloWrapper } from "./ApolloWrapper";
import { Header } from "./ui/Header";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ApolloWrapper>
          <Providers>
            {children}
            {modal}
          </Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
