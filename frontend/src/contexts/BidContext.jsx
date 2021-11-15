import { createContext, useState } from 'react'

export const BidContext = createContext();

export default function BidProvider(props) {
  const [bidsByUser, setBidsByUser] = useState([])

  const fetchBidsByUser = async (userId) => {
    let res = await fetch(`/rest/Bid/${userId}`)
    res = await res.json()
    setBidsByUser(res)
  }

  const values = {
    bidsByUser,
    fetchBidsByUser
  }

  return (
    <BidContext.Provider value={values}>
      {props.children}
    </BidContext.Provider>
  )
}
