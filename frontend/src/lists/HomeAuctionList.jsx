import { useContext, useEffect } from 'react';
import { AuctionCard } from "../cards/AuctionCard";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";

export const HomeAuctionList = ({ filters }) => {
  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(AuctionDetailsContext)

  useEffect(() => {
    setTimeout(() => {
      fetchFilteredAuctionItems(filters);
    }, 250);
    return clearTimeout()
  }, [filters]);

  const renderedAuctionItems = filteredAuctionItems.map((auction) => {
    return (
      <AuctionCard
        className={"h-12 w-20 border-solid border-gray-200 border-2"}
        auction={auction}
        key={auction.id}
      />
    );
  });

  return <div className="h-auto grid grid-cols-2">{renderedAuctionItems}</div>
};
