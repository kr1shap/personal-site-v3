import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/app/components/CustomCursor";
import Navbar from "@/app/components/stickyComponents/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "krisha's site",
  description: "krisha's portfolio site",
  icons: {
    icon: "/lumaBlue.png",
    shortcut: "/lumaBlue.png",
    apple: "/lumaBlue.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
