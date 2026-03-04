import type { Metadata } from "next";
import { Bebas_Neue, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adventure road",
  description: "Adventure road",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${barlow.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}