import { createContext } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie'

const UserContext = createContext({});

function UserProviderWrapper({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies();



  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <UserContext.Provider value={{ cookies, setCookie, removeCookie }}>
            {children}

        </UserContext.Provider>
    </CookiesProvider>
  );
}

export { UserProviderWrapper };
export default UserContext;