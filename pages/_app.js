import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import NavbarMain from '../components/navbar';
import '../styles/globals.css';
import UserContext from '../components/userContext';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  return (
    <>
      <Provider session={pageProps.session}>
        <UserContext.Provider value={{ user, setUser }}>
          <NavbarMain {...pageProps} />
          <Component {...pageProps} />
        </UserContext.Provider>
      </Provider>
    </>
  );
}

export default MyApp;
