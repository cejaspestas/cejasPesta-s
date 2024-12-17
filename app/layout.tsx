import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "./(routes)/components/footer/footes";
import { DataProvider } from "@/context/fetchdatos";
const geistSans = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cejas y Pestañas Cucuta ",
  description: " Belleza, cosmética y cuidado personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
      <html lang="en">
        <body
          className={geistSans.className}
        >
          <DataProvider>
            <Header/>
            {children}
            <Footer/>
          </DataProvider>
        </body>
      </html>

  );
}
