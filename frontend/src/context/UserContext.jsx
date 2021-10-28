import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserUpdateContext =createContext()


export const useUser=()=>{
  return useContext(UserContext)
}

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(true);

  const toggleUser=()=>{
    setUser(!user)
  }



  return(
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={toggleUser}>
      {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
};

