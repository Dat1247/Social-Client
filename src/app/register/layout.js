import { ProviderRedux } from '../../redux/provider';


export const metadata = {
  title: 'Register',
}

export default function RegisterLayout({ children }) {
  return (
        <ProviderRedux>
          {children}
        </ProviderRedux>
  )
}
