import { createContext, useState } from 'react'

export const AuctionDetailsContext = createContext();

export default function AuctionDetailsProvider(props) {
  const [auctionItem, setAuctionItem] = useState([])
  const [filteredAuctionItems, setFilteredAuctionItems] = useState([])
  const [userSellingItems, setUserSellingItems] = useState([]);


  const fetchAuctionItem = async (id) => {
    let res = await fetch(`/rest/auctionItem/${id}`)
    res = await res.json()
    console.log("res after bid ", res);
    setAuctionItem(res)
  }

  const fetchFilteredAuctionItems = async (obj) => {
    obj = JSON.stringify(obj)
    let res = await fetch(`/rest/auctionItem/filtered/${obj}`)
    res = await res.json()
    setFilteredAuctionItems(filteredAuctionItems.length == 0 || obj.includes('"page":0')
      ? res : filteredAuctionItems.concat(res) )
  }

  const fetchUserSellingItems = async (userId) =>{
    let res = await fetch(`/rest/auctionItem/user/${userId}`);
    res =await res.json()
    setUserSellingItems(res)


  }

  const values = {
    auctionItem,
    filteredAuctionItems,
    userSellingItems,
    fetchAuctionItem,
    fetchFilteredAuctionItems,
    fetchUserSellingItems
  }

  return (
    <AuctionDetailsContext.Provider value={values}>
      {props.children}
    </AuctionDetailsContext.Provider>
  )
}
