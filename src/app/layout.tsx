import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Order Tracking & Delivery Status | ShopStream',
  description:
    'Live real-time order tracking, delivery journey timeline, courier ETA, and customer support assistance.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <ToastProvider>
          {/* Mobile frame wrapper: centered on desktop with realistic mobile dimensions */}
          <main className="min-h-screen flex justify-center items-start sm:py-6 md:py-10">
            <div className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] bg-slate-50 dark:bg-slate-950 sm:rounded-[36px] sm:shadow-2xl sm:border sm:border-slate-200 dark:sm:border-slate-800 overflow-hidden flex flex-col relative">
              {children}
            </div>
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
