import {AuctionCard} from '../cards/AuctionCard'
import { useContext } from 'react';
import { AuctionContext } from '../contexts/AuctionContextProvider';

export const HomeAuctionList = () => {

    const {auctions} = useContext(AuctionContext) 

    const renderedAuctionItems = auctions.map((auction, i) => {
        return (
            <AuctionCard
            className={"h-12 w-20 border-solid border-gray-200 border-2"}
            product={auction}
            key={i}
          />
        );
      });
    
    return (
    <div className="searchResult">
        <div>
            <div>{renderedAuctionItems}</div>
        </div>
    </div>
    );
}
