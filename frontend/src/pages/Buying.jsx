import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export const Buying = () => {
  const {userBuyingItems, fetchUserBuyingItems} = useContext(AuctionDetailsContext);
  const {currentUser} = useContext(UserContext);
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [endedAuctions, setEndedAuctions] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [lostAuctions, setLostAuctions] = useState([]);
  const currentTime = new Date().getTime();
  const [toggleBidding, setToggleBidding] = useState(true);
  const [toggleWon, setToggleWon] = useState(true);
  const [toggleLost, setToggleLost] = useState(true);
  const history = useHistory();

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
      <div className="font-bold py-2 mx-3 border-b-4 flex justify-between">
        <span>Currently bidding on</span>
        <button onClick={()=>setToggleBidding(p=>!p)}> {toggleBidding?"Hide":"Show"}</button>
      </div>
      {toggleBidding && currentAuctions.map((item) => (
        <div className="mx-3 my-2 px-2 py-1 border border-solid" key={item.id} onClick={()=>{history.push(`/auction-details/${item.id}`)}} >
          <div>{item.title}</div>
          <div className="flex justify-between text-xs">
            <div className="bg-myPr-dark px-2">
              <span className="text-myGr-light">Your bid : </span>
              <span className="text-white">{item.userBid}</span>
            </div>
            <div className="bg-myGr-light px-2">
              <span className="text-myPr-dark">Highest Bid : </span>
              <span className="text-white">{item.highestBid}</span>
            </div>
            <div key={item.id}>{<LocalCountdown className="text-black" auctionEndTime={item.endTime}/>}</div>
          </div>
        </div>
      ))}
      <br />
       <div className="font-bold py-2 mx-3 border-b-4 flex justify-between">
        <span>Won Auctions</span>
        <button onClick={()=>setToggleWon(p=>!p)}> {toggleWon?"Hide":"Show"}</button>
      </div>
      {toggleWon && wonAuctions.map((item) => (
        <div className="mx-3 my-2 px-2 py-1 border border-solid bg-gray-200" key={item.id}>
          <div className="text-xs flex justify-between text-gray-500">
            <div className="whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{maxWidth:"150px"}} >{item.title}</div>
            <div className="flex justify-end">
              <div> {new Date(+item.endTime).toLocaleDateString()}  </div>
              <div className="bg-gray-500 px-2">
               <span className="text-black">Price : </span>
               <span className="text-white font-bold">{item.highestBid}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <br />
       <div className="font-bold py-2 mx-3 border-b-4 flex justify-between">
        <span>Lost Auctions</span>
        <button onClick={()=>setToggleLost(p=>!p)}> {toggleLost?"Hide":"Show"}</button>
      </div>
      {toggleLost && lostAuctions.map((item) => (
        <div className="mx-3 my-2 px-2 py-1 border border-solid bg-gray-200" key={item.id}>
          <div className="text-xs flex justify-between text-gray-500">
            <div>{item.title}</div>
            <div className="flex justify-end">
              <div> {new Date(+item.endTime).toLocaleDateString()}  </div>
              <div className="bg-gray-500 px-2">
               <span className="text-black">Price : </span>
               <span className="text-white font-bold">{item.highestBid}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



export default function LocalCountdown({ auctionEndTime }) {
  const [currentTime] = useState(new Date().getTime());
  const [countdown, setCountdown] = useState(auctionEndTime - currentTime);
  const [formattedTime, setFormattedTime] = useState(["..."]);

  const formatTime = () => {
    let format = [];
    let days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    let hours = Math.floor((countdown / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((countdown / (1000 * 60)) % 60);
    let seconds = Math.floor((countdown / 1000) % 60);

    if (countdown < 0) {
      format = ["Auction expired"];
    }
    if (countdown > 172800000) {
      format = [days, " days"];
    }
    if (countdown > 86400000 && countdown < 172800000) {
      format = [days, " day "];
    }
    if (countdown > 3600000 && countdown < 86400000) {
      format = [hours, " hours"];
    }
    if (countdown > 60000 && countdown < 3600000) {
      format = [minutes, " min ", seconds, " s"];
    }
    if (countdown > 0 && countdown < 60000) {
      format = [seconds, " s"];
    }
    return format;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(countdown - 1000);
      setFormattedTime(formatTime());
    }, 1000);
    return () => clearInterval(timer);
  },[countdown]);

  return <div>{formattedTime}</div>;
}

