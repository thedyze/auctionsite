import {AuctionCard} from '../cards/AuctionCard'

import { useState } from 'react';

export const HomeAuctionList = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const clearResults = () => setSearchResults([]);

    const renderedAuctionItems = searchResults.map((searchResult, i) => {
        return (
            <AuctionCard
            className={"h-12 w-20 border-solid border-gray-200 border-2"}
            product={searchResult}
            key={i}
          />
        );
      });
    
    return (
    <div className="searchResult">

        {noResults && <p className="no-results">No results found.</p>}
        <div>
            <div>{renderedAuctionItems}</div>
        </div>
    </div>
    );
}
