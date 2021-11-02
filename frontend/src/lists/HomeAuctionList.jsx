import {AuctionCard} from '../cards/AuctionCard'
import { useContext, useEffect, useState } from 'react';
import { AuctionDetailsContext } from '../contexts/AuctionDetailsContext';

export const HomeAuctionList = () => {

  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(AuctionDetailsContext)

  useEffect(() => {
    let obj = {
      search: "hugo",
      categoryId: "1",
      priceFrom: "2000",
      priceTo: "8000",
      buttonSelection: "default"
    }
    fetchFilteredAuctionItems(obj)
  }, [])

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
        <div className="h-auto grid grid-cols-2">
            {renderedAuctionItems}
        </div>
    );
}
