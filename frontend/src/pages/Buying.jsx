import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export const Buying = () => {
  const { userBuyingItems, fetchUserBuyingItems } = useContext(AuctionDetailsContext);
  const { currentUser } = useContext(UserContext);

  //for render mapping
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [wonAuctions, setWonAuctions] = useState([]);
  const [lostAuctions, setLostAuctions] = useState([]);

  //toggles
  const [toggleBidding, setToggleBidding] = useState(true);
  const [toggleWon, setToggleWon] = useState(true);
  const [toggleLost, setToggleLost] = useState(true);

  const history = useHistory();
  const currentTime = new Date().getTime();



  useEffect(() => {
    if (!currentUser) return
    fetchUserBuyingItems();
  }, [currentUser]);

  useEffect(() => {
    let currentAuctionsTemp = []
    let wonAuctionsTemp = []
    let lostAuctionsTemp = []
    userBuyingItems.map((item) => {
      item.endTime > currentTime
        ? currentAuctionsTemp.push(item)
        : item.highestBid > item.userBid
          ? lostAuctionsTemp.push(item)
          : wonAuctionsTemp.push(item);
    });
    setCurrentAuctions(currentAuctionsTemp)
    setWonAuctions(wonAuctionsTemp)
    setLostAuctions(lostAuctionsTemp)


  }, [userBuyingItems]);


  return (
    <div className="bg-myAw h-full pb-20">
      <div className="w-full text-center font-myHtext text-4xl py-6">Buying</div>
      <div className="font-bold font-myHtext text-xl py-2 mx-3 border-b-4 flex justify-between">
        <span>Currently bidding on</span>
        <button className="text-base underline" onClick={() => setToggleBidding(p => !p)}> {toggleBidding ? "Hide" : "Show"}</button>
      </div>
      {toggleBidding && currentAuctions.map((item) => (
        <div className="bg-white mx-3 my-2 px-2 py-1 border border-solid" key={item.id} onClick={() => { history.push(`/auction-details/${item.id}`) }} >
          <div className="font-myPtext font-semibold text-myGr-dark text-lg">{item.title}</div>
          <div className="w-full flex items-center text-base">
            <div className="w-4/12 bg-myPr-dark p-1 rounded-sm mr-1 text-center">
              <div className="text-myGr-light">Your bid </div>
              <div className="text-white">{item.userBid + " €"}</div>
            </div>
            <div className="w-4/12 bg-myGr-light p-1 mr-1 rounded-sm text-center">
              <div className="text-black">Current </div>
              <div className="text-white">{item.highestBid + " €"}</div>
            </div>
            <div className="w-5/12 text-right" key={item.id}>{<LocalCountdown className="text-black" auctionEndTime={item.endTime} />}</div>
          </div>
        </div>
      ))}
      <br />
      <div className="font-bold font-myHtext text-xl py-2 mx-3 border-b-4 flex justify-between">
        <span>Won Auctions</span>
        <button className="text-base underline" onClick={() => setToggleWon(p => !p)}> {toggleWon ? "Hide" : "Show"}</button>
      </div>
      {toggleWon && wonAuctions.map((item) => (
     <div className="mx-3 my-2 px-2 py-1 bg-myGr-disabled" key={item.id}>
          <div className="flex justify-between items-center text-gray-500">
            <div className="font-myPtext whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{ maxWidth: "150px" }} >{item.title}</div>
            <div className="flex items-center ">
              <div className="text-xs mr-2"> {new Date(+item.endTime).toLocaleDateString()}  </div>
              <div className=" bg-myGr-light flex items-center p-px text-left">
                <div className="text-xs font-normal px-1 text-black">Price: </div>
                <div className="text-white w-18 text-right px-1 font-bold">{item.highestBid + " €"}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <br />
      <div className="bg-myAwfont-bold font-myHtext text-xl pb-2 mt-4 mx-3 border-b-4 flex justify-between ">
        <span>Lost Auctions</span>
        <button className="text-base underline" onClick={() => setToggleLost(p => !p)}> {toggleLost ? "Hide" : "Show"}</button>
      </div>
      {toggleLost && lostAuctions.map((item) => (
     <div className="mx-3 my-2 px-2 py-1 bg-gray-200" key={item.id}>
          <div className="flex justify-between items-center text-gray-500">
            <div className="font-myPtext whitespace-nowrap overflow-x-hidden font-bold overflow-ellipsis" style={{ maxWidth: "150px" }} >{item.title}</div>
            <div className="flex items-center ">
              <div className="text-xs mr-2"> {new Date(+item.endTime).toLocaleDateString()}  </div>
              <div className=" bg-gray-400 flex items-center p-px text-left">
                <div className="text-xs font-normal px-1 text-black">Price: </div>
                <div className="text-white w-18 text-right px-1 font-bold">{item.highestBid + " €"}</div>
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
      format = <span className="text-myRe">{[minutes, " min ", seconds, " s"]}</span>
    }
    if (countdown > 0 && countdown < 60000) {
      format = <span className="text-myRe">{[seconds, " s"]}</span>;
    }
    return format;
  };

  useEffect(() => {
    if (countdown <= 3600000) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1000);
        setFormattedTime(formatTime());
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setFormattedTime(formatTime());
    }
  }, [countdown]);

  return <div>{formattedTime}</div>;
}

