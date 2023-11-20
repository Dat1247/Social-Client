import { ProviderRedux } from '../../redux/provider';


export const metadata = {
  title: 'Login',
}

export default function LoginLayout({ children }) {
  return (
        <ProviderRedux>
          {children}
        </ProviderRedux>
  )
}
