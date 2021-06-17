import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import NavbarMain from '../components/navbar'
import '../styles/globals.css'
import UserContext from '../components/userContext'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <NavbarMain />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  )
}

export default MyApp
