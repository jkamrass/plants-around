import 'bootstrap/dist/css/bootstrap.css'
import NavbarMain from '../components/navbar'
import '../styles/globals.css'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <> 
      <Provider session={pageProps.session}>
        <NavbarMain />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
