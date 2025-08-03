import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { QueryProvider } from "@/providers/query-provider";
import TopLink from "@/components/Navbar/TopLink";
import Chatbot from "@/components/Chatbot/Chatbot";

export const metadata: Metadata = {
  title: "Mediloon online pharmacy Store",
  description: "Premium online pharmacy for Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] font-sans antialiased">
        <div className="flex flex-col bg-white max-w-[1280px] mx-auto min-h-screen">
          <QueryProvider>
            <TopLink />
            <div className="sticky top-0 z-50 bg-white shadow-sm">
              <Navbar />
            </div>
            <main className="flex-1">
              {children}
              <Chatbot />
            </main>
          </QueryProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}