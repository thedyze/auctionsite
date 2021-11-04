import { useContext, useEffect } from 'react';
import { AuctionCard } from "../cards/AuctionCard";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";

export const HomeAuctionList = ({ filters }) => {
  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(
    AuctionDetailsContext
  );

  useEffect(() => {
    console.log("When?")
    setTimeout(() => {
      fetchFilteredAuctionItems(filters);
    }, 250);
    return clearTimeout()
  }, [filters]);

  const renderedAuctionItems = filteredAuctionItems.map((auction, i) => {
    return (
      <AuctionCard
        className={"h-12 w-20 border-solid border-gray-200 border-2"}
        auction={auction}
        key={i}
      />
    );
  });

  return (
    <>
      <div className="h-auto grid grid-cols-2">{renderedAuctionItems}</div>;
    </>
  );
};
