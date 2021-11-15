import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";

export const Buying = () => {
  const {userBuyingItems, fetchUserBuyingItems} = useContext(AuctionDetailsContext);
  const {currentUser} = useContext(UserContext);
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [endedAuctions, setEndedAuctions] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [lostAuctions, setLostAuctions] = useState([]);
  const currentTime = new Date().getTime()

    useEffect(() => {
    if (!currentUser) return;  
    fetchUserBuyingItems(currentUser.id); 
    let currentAuctions = []
    let endedAuctions = []
      userBuyingItems.map((item) => {
        item.endTime > currentTime ? currentAuctions.push(item): endedAuctions.push(item);
      });
      setCurrentAuctions(currentAuctions)
      setEndedAuctions(endedAuctions)
    }, [userBuyingItems,currentUser]);

  return (
    <div>
      <div> Items you have bid on </div>
      {currentAuctions.map((item) => (
        <div key={item.id}>
          <div style={{ color: "green" }}>{item.title} active</div>
        </div>
      ))}
      <div> History</div>
      {endedAuctions.map((item) => (
        <div key={item.id}>
          <div style={{ color: "red" }}>{item.title} inactive </div>
        </div>
      ))}
    </div>
  )};
