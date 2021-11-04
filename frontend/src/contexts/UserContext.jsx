import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [user, setUser] = useState([]);
  
  
  const fetchCurrentUser = async () => {
    let res = await fetch("/api/whoami");
    try {
      let user = await res.json();
      if (user) {
        console.log("User logged in");
        setCurrentUser(user);
      }
      console.log(user);
    } catch {
      console.log("No User yet");
    }
  };
  
    const fetchUser = async (id) => {
      let res = await fetch(`/rest/user/${id}`);
      res = await res.json();
      setUser(res);
    };
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const values = {
    currentUser,
    user,
    fetchUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
