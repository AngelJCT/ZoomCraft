import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';
import Header from '../components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ZoomCraft",
  description: "Image Upscale",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#111417]`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
