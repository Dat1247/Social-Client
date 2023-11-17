import { Inter } from 'next/font/google'
import { ProviderRedux } from '../../redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Login page',
}

export default function LoginLayout({ children }) {
  return (
        <ProviderRedux>
          {children}
        </ProviderRedux>
  )
}
