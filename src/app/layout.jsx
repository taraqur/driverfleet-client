import { Montserrat, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600"],
});

export const metadata = {
  title: "DriveFleet - Premium Car Rental",
  description: "The world's premier platform for high-end automotive experiences and luxury rentals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
