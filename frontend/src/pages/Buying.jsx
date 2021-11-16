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
    let wonAuctions = []
    let lostAuctions = []

    userBuyingItems.map((item) => {
      item.endTime > currentTime ? currentAuctions.push(item): endedAuctions.push(item);
    });
    setCurrentAuctions(currentAuctions)
    setEndedAuctions(endedAuctions)

    endedAuctions.map((item) => {
      item.highestBid > item.userBid ? lostAuctions.push(item): wonAuctions.push(item);
    });
    setWonAuctions(wonAuctions)
    setLostAuctions(lostAuctions)

    }, [userBuyingItems,currentUser]);
    

  return (
    <div>
      <div> Items you have bid on </div>
      {currentAuctions.map((item) => (
        <div key={item.id}>
          <div style={{ color: "red" }}>{item.title}</div>
        </div>
      ))}
      <div>
        <div> Won Auctions</div>
        {wonAuctions.map((item) => (
        <div key={item.id}>
          <div style={{ color: "green" }}>{item.title}</div>
        </div>
      ))}
      </div>
      <div>
        <div> Lost Auctions</div>
        {lostAuctions.map((item) => (
        <div key={item.id}>
          <div style={{ color: "gray" }}>{item.title}</div>
        </div>
      ))}
      </div>
    </div>
<<<<<<< HEAD
  )};
=======
  )};
>>>>>>> buying-page
