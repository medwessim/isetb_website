import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import GradientBackground from './components/Background/app';
import { Navbar } from './Nav/app';
import Footer from './Footer/page';
import Loader from './Loader/page';

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
        {/* Loader - shows only on first visit, above everything */}
        <Loader />
        
        {/* Main website content - hidden until loader finishes */}
        <div className="contents">
          {/* Background animation - permanent */}
          <GradientBackground />
          
          {/* Navbar - permanent */}
          <Navbar />
          
          {/* Main content area - this changes between pages */}
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Footer - permanent */}
          <Footer />
        </div>
      </body>
    </html>
  );
}