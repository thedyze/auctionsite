import { useHistory } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";

export const AuctionCard = ({auction}) => {
  const history = useHistory();

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };

  

  return (
      <div onClick={goToAuctionDetails} className="h-30 flex ">
        {false ? (
          <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
        ) : (
          <img className="w-3/5" src="" alt="Bild saknas"></img>
        )}
        <div className=" hola h-40 flex "></div>
        <div className="p-2 w-full bg-myPr-light">
          <div className="text-white ">{auction.title}</div>
          <div className="text-yellow-900">
            {auction.highestBid === "0"
              ? "No Bids yet"
              : `Highest bid: ${auction.highestBid}`}
          </div>
          <div className="text-myPr-light">Bids: {auction.numberOfBids}</div>
          <div className="text-pink-700">Category: {auction.categoryId}</div>
          <div className="text-myRe">
            endtime: {<CountdownTimer auctionEndTime={auction.endTime} />}
          </div>
        </div>
      </div>
  );
};
