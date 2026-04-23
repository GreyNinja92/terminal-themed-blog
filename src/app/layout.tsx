import type { Metadata } from 'next';
import { JetBrains_Mono, Fraunces } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saksham Khatod — saksham.sh',
  description: 'Software Development Engineer at AWS. Distributed systems, infrastructure, and what LLMs can do with real infrastructure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
