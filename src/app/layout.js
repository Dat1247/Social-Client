import { Inter } from 'next/font/google'
import './globals.css';
import { ProviderRedux } from '@/redux/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100`}>
        <ProviderRedux>
          {children}
        </ProviderRedux>
      </body>
    </html>
  )
}
