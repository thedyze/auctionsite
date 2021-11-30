import { stepButtonClasses } from '@mui/material';
import { createContext, useState } from 'react'

export const AuctionDetailsContext = createContext();

export default function AuctionDetailsProvider(props) {
  const [auctionItem, setAuctionItem] = useState([])
  const [filteredAuctionItems, setFilteredAuctionItems] = useState([])
  const [userSellingItems, setUserSellingItems] = useState([]);
  const [userBuyingItems, setUserBuyingItems] = useState([]);
  const [noMoreItems, setNoMoreItems] = useState(false)
  const [fetching, setFetching] = useState(false)

  const fetchAuctionItem = async (id) => {
    let res = await fetch(`/rest/auctionItem/${id}`)
    res = await res.json()
    setAuctionItem(res)
  }

  const fetchFilteredAuctionItems = async (obj) => {
    obj = JSON.stringify(obj)
    let res = await fetch(`/rest/auctionItem/filtered/${obj}`)
    res = await res.json()
    setFilteredAuctionItems(filteredAuctionItems.length == 0 || obj.includes('"page":0')
      ? res : filteredAuctionItems.concat(res))

    setNoMoreItems(res.length < 10)
    setFetching(false)
  }

  const fetchUserSellingItems = async () => {
    let res = await fetch(`/rest/auctionItem/userSelling`);
    res = await res.json()
    setUserSellingItems(res)
  }

  const fetchUserBuyingItems = async () => {
    let res = await fetch(`/rest/auctionItem/userBuying`);
    res = await res.json()
    setUserBuyingItems(res)
  }

  const values = {
    auctionItem,
    filteredAuctionItems,
    userSellingItems,
    userBuyingItems,
    noMoreItems,
    fetching,
    fetchAuctionItem,
    fetchFilteredAuctionItems,
    fetchUserSellingItems,
    fetchUserBuyingItems,
    setFetching
  }

  return (
    <AuctionDetailsContext.Provider value={values}>
      {props.children}
    </AuctionDetailsContext.Provider>
  )
}
