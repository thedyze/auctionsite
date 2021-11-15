// import { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CountdownTimer from "../components/CountdownTimer";
//  import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";

// const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);

export const AuctionCard = ({auction}) => {
  const history = useHistory();

  const goToAuctionDetails = () => {
    history.push(`/auction-details/${auction.id}`);
  };

 

  return (
    <div onClick={goToAuctionDetails} className="h-30 flex bg-white pb-2">
        {false ? (
          <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
        ) : (
          <img className="w-36 h-36" src={"uploads/TCd1W34KAG_img1.jpg"} alt="Bild saknas"></img>
          // <img className="w-36 h-36" src={"/uploads/" + auction.imagePath + "_img1.jpg"} alt="Bild saknas"></img>
        )}
        <div className=" hola h-36 flex "></div>
      <div className="p-2 w-full flex flex-col bg-myAw">
        <div className="text-black font-medium col-span-2 h-12">{auction.title}</div>
        <div className="w-full flex flex-row justify-evenly text-left">
          <div className="w-3/5 text-black font-bold text-left ">
            {auction.highestBid === "0"
              ? "startPrice"
              : `${auction.highestBid} kr`}
          </div>
          <div className="w-2/5 text-black text-left">{auction.numberOfBids -1} bids</div>
        </div>
          <div className="">Category: {auction.categoryId}</div>
          <div className="w-full text-right text-myRe mt-2">
            {<CountdownTimer auctionEndTime={auction.endTime} />}
          </div>
        </div>
      </div>
  );
};
