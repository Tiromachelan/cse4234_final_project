import { createContext } from 'react';
import { useState } from 'react';

const UserContext = createContext({});

function UserProviderWrapper({ children }) {
  const [username, setUsername] = useState();

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProviderWrapper };
export default UserContext;