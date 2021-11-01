import { createContext, useState } from 'react'

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState([])

  const fetchUser = async (id) => {
    let res = await fetch(`/rest/user/${id}`)
    res = await res.json()
    setUser(res)
  }

  const values = {
    user,
    fetchUser
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  )
}
