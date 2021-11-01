import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

// export const isLoggedIn = () => {
//   return useContext(UserContext);
// };

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    let res = await fetch("/api/whoami");
    try {
      let usuario = await res.json();
      if (usuario) {
        console.log("yes");
        setIsLoggedIn(true);
      }
      console.log(usuario, isLoggedIn);
    } catch {
      console.log("No User yet");
    }
  };

  const values = {
    isLoggedIn,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
