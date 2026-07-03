import type { Metadata } from 'next';
import { Cinzel, Cormorant, Marcellus, EB_Garamond } from 'next/font/google';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import HydrationProvider from '@/components/providers/HydrationProvider';
import Navbar from '@/components/layout/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import Footer from '@/components/layout/Footer';
import './globals.css';

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

const cormorant = Cormorant({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const marcellus = Marcellus({
  variable: '--font-marcellus',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  variable: '--font-garamond',
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shamiana — The Taj Mahal Palace, Mumbai',
  description: "Mumbai's legendary 24-hour all-day dining restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${marcellus.variable} ${ebGaramond.variable}`}
    >
      <body className="font-garamond bg-taj-dark text-taj-offwhite antialiased">
        <Navbar />
        <CartDrawer />
        <SmoothScrollProvider>
          <HydrationProvider>
            {children}
          </HydrationProvider>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
