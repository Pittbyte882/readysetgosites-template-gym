import type { Metadata, Viewport } from 'next'
import { Oswald, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const oswald = Oswald({ 
  subsets: ["latin"],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700']
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Iron & Grit | Hardcore Powerlifting Gym',
  description: 'No excuses. No shortcuts. Just raw power. Join Iron & Grit - the premier powerlifting gym for serious athletes.',
  generator: 'v0.app',
  keywords: ['powerlifting', 'gym', 'fitness', 'strength training', 'personal training'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oswald.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
