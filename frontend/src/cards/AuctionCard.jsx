import { useHistory } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

export const AuctionCard = ({auction}) => {
  const history = useHistory();
  const auctionEndTime = auction.endTime;

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };

  

  return (
    <div>
      <div onClick={goToAuctionDetails} className="h-30 flex bg-gray-200">
        {false ? (
          <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
        ) : (
          <img className="w-3/5" src="" alt="Bild saknas"></img>
        )}
        <div className="h-40 flex bg-gray-200"></div>
        <div className="p-2 w-full bg-green-300">
          <div className="text-white bg-green-500">{auction.title}</div>
          <div className="text-yellow-900">
            {auction.highestBid==="0"?"No Bids yet":`Highest bid: ${auction.highestBid}`} 
          </div>
          <div className="text-blue-500">Bids: {auction.numberOfBids}</div>
          <div className="text-pink-700">Category: {auction.categoryId}</div>
          <div className="text-pink-700">endtime: {auction.endTime}</div>
          <CountdownTimer auctionEndTime={auctionEndTime}/>
        </div>
      </div>
    </div>
  );
};
