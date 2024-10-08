import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Todo App",
  description: "Developed by Saad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">

        <body suppressHydrationWarning={true} className={inter.className}>
    <ThemeProvider>

          <Navbar />
          {children}
          </ThemeProvider>

        </body>

      </html>

  );
}
