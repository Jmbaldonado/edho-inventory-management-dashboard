import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import DashboardWrapper from './(components)/DashboardWrapper';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EdRoh Inventory Management',
  description: 'A simple inventory management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
