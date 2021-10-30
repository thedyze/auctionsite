import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();



export const isLoggedIn=()=>{
  return useContext(UserContext)
}



export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  
 const  toggle=(()=>{
    setUser(!user)
  })

  const values={
    user,
    toggle
  }


  return(
    <UserContext.Provider value={values}> 
      {children}
    </UserContext.Provider>
  )
};

