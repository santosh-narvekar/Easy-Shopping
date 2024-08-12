
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/utils/providers";
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Easy Shopping",
  description: "Perfect for Shopping from Comforts of Your Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html>
      <body className={inter.className}>
        <Providers>
        <Navbar />
        <section className=" py-8 px-4 ">
        {children}
        </section>
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
