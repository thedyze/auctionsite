import { useContext, useState, useEffect, useMemo } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export const Selling = () => {
  const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
  const {currentUser} = useContext(UserContext)
  const [activeItems, setActivateItems] = useState([]);
  const [inactiveItems, setInactivateItems] = useState([]);
  const [toggleSelling,setToggleSelling]=useState(true)
  const [toggleHistory, setToggleHistory] = useState(true);
  const history=useHistory()

  const now =new Date().getTime()

    useEffect(() => {
      if (!currentUser) return;
      fetchUserSellingItems();    
    }, [currentUser]);

    useEffect(() => {
    let activeTemp=[]
    let inactiveTemp=[]
      userSellingItems.map((item) => {
        item.endTime > now ? activeTemp.push(item): inactiveTemp.push(item);
      });
      setActivateItems(activeTemp)
      setInactivateItems(inactiveTemp)
    }, [userSellingItems]);


  return (
    <div className="bg-myAw h-full pb-20">
      <div className="w-full text-center font-myHtext text-4xl  py-6">Selling</div>
      <div className="font-bold text-xl font-myHtext py-2 mx-3 border-b-4 flex justify-between">
        <span>Currently selling</span>
        <button className="text-base underline" onClick={()=>setToggleSelling(p=>!p)}> {toggleSelling?"Hide":"Show"}</button>
      </div>
      {toggleSelling&& activeItems.map((item) => (
        <div className="bg-white mx-3 my-2 px-2 py-1 border border-solid" key={item.id} onClick={()=>{history.push(`/auction-details/${item.id}`)}} >
          <div className="font-myPtext text-lg">{item.title}</div>
          <div className="w-full flex justify-items-start text-xs py-0.5">
            <div className="w-3/12 bg-myPr-dark p-px rounded-sm mr-1 text-center">
              <span className="text-myGr-light">Bids : </span>
              <span className="text-white">{item.numberOfBids}</span>
            </div>
            <div className="w-4/12 bg-myGr-light p-px mr-1 rounded-sm text-center">
              <span className="text-myPr-dark">{item.numberOfBids > 0 ? "Highest Bid: " : "Start price: "}</span>
              <span className="text-white">{item.highestBid}</span>
            </div>
            <div className="w-5/12 text-right" key={item.id}>{<LocalCountdown className="text-black" auctionEndTime={item.endTime}/>}</div>
          </div>
        </div>
      ))}
      <br />
      <div className="font-bold font-myHtext py-2 mx-3 border-b-4 flex justify-between">
        <span>Passed items</span>
        <button className="text-base underline" onClick={()=>setToggleHistory(p=>!p)}> {toggleHistory?"Hide":"Show"}</button>
      </div>
      {toggleHistory && inactiveItems.map((item) => (
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
