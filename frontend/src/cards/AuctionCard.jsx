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
    <div onClick={goToAuctionDetails} className="h-30 flex bg-white mb-3 p-1 outline-grey">
        {false ? (
          <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"></img>
        ) : (
          <img className="w-32 h-32" src={`uploads/${auction.imagePath}_img1.jpg`} alt="pic missing"></img>
          // <img className="w-36 h-36" src={"/uploads/" + auction.imagePath + "_img1.jpg"} alt="Bild saknas"></img>
        )}
        <div className="h-32 flex "></div>
      <div className="h-32 p-2 w-full flex flex-col bg-white">
        <div className="h-1/2 font-myHtext font-bold col-span-3 align-top leading-tight">{auction.title}</div>
        <div className="w-full flex flex-row justify-evenly ">
          <div className="w-1/2 font-myPtext text-black text-base font-bold text-left mt-2">
            {auction.highestBid === "0"
              ? `${auction.startPrice} kr`
              : `${auction.highestBid} kr`}
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className=" w-full flex flex-row justify-evenly mt-0">
          <div className=" w-1/3 font-myPtext text-black text-sm text-left align-text-bottom mt-1">
            
            {auction.numberOfBids} bids
            
          </div>
          {/* <div className="">Category: {auction.categoryId}</div> */}
          <div className=" w-2/3 font-myPtext font-medium text-sm text-right text-black">
            {<CountdownTimer auctionEndTime={auction.endTime} />}
          </div>
        </div>
      </div>
    </div>
  );
};
