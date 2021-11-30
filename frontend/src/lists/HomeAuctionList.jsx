import { AuctionCard } from "../cards/AuctionCard";

export const HomeAuctionList = ({ filteredAuctionItems }) => {

  const renderedAuctionItems = filteredAuctionItems.map((auction) => {
    return (
      <AuctionCard
        auction={auction}
        key={auction.id}
      />
    )
  })

  return <div className="h-auto  p-2 w-full flex flex-col col-span-1 pt-4">{renderedAuctionItems}</div>
};
