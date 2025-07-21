import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mediloon Store",
  description: "Premium online pharmacy for Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col bg-white max-w-[1440px] mx-auto min-h-screen">
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
