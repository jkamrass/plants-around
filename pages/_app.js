import 'bootstrap/dist/css/bootstrap.css'
import NavbarMain from '../components/navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <> 
      <NavbarMain />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
