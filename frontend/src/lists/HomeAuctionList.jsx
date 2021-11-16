import { AuctionCard } from "../cards/AuctionCard";

export const HomeAuctionList = ({ filteredAuctionItems }) => {

  const renderedAuctionItems = filteredAuctionItems.map((auction) => {
    return (
      <AuctionCard
        className={"h-12  w-20 border-solid border-gray-200 border-2"}
        auction={auction}
        key={auction.id}
      />
    )
  })

  return <div className="h-auto bg-myAw p-2 w-full flex flex-col col-span-1 pt-4">{renderedAuctionItems}</div>
};
