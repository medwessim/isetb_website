import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import GradientBackground from './components/Background/app';
import { Navbar } from './Nav/app';
import Footer from './Footer/page';
import Loader from './Loader/page';
import { ThemeProvider } from './context/ThemeContext';

export const metadata: Metadata = {
  title: "IEEE ISET Bizerte Student Branch",
  description: "IEEE ISET Bizerte Student Branch",
  icons: {
    icon: [
      // Default favicon
      {
        url: "/logo.png",
        sizes: "any",
      },]}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Loader - shows only on first visit, above everything */}
          <Loader />

          {/* Main website content */}
          <div className="contents">
            <GradientBackground />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}