import {AuctionCard} from '../cards/AuctionCard'
import { useContext, useEffect } from 'react';
import { AuctionDetailsContext } from '../contexts/AuctionDetailsContext';

export const HomeAuctionList = () => {

  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(AuctionDetailsContext)

  useEffect(() => {
    let obj = {
      search: null,
      categoryId: null,
      priceFrom: null,
      priceTo: null  ,      
      buttonSelection: "wefewfw   "
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
