import Navbar from "@/components/shared/Navbar/Navbar";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/shared/Footer/Footer";
import NextTopLoader from "nextjs-toploader";
import TopLoader from "@/components/TopLoader/TopLoader";

// Custom font
const uncutSans = localFont({
  src: [
    {
      path: "../../public/fonts/UncutSans-Variable.woff2",
    },
  ],
  display: "block",
  variable: "--font-uncut-sans",
  weight: "200 800",
});

export const metadata = {
  title: {
    template: "%s | United Threads",
    default: "United Threads — Wear The Change",
  },
  description:
    "Design Your Own Apparel, Unleash Your Creativity. We pride ourselves in providing a curated collection of custom apparel designed to inspire and empower.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${uncutSans.variable}`}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </head>

      <body className="font-uncut-sans antialiased">
        <TopLoader />

        <Navbar />

        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
