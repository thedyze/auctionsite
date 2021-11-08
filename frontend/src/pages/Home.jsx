
import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useState } from "react";
import { Search } from "../components/search/Search";


export const Home = () => {

  // DEFAULT FILTER PARAMETERS IN HOME PAGE. EVERYTHING IS SET TO NULL
  const [filterParams, setFilterParams] = useState({
    search: null,
    categoryId: null,
    priceFrom: null,
    priceTo: null,
    buttonSelection: "default"
  });

  //check current filter params
  //console.log(filterParams);

  return (
    <div>
      <div className="text-center font-logoFont bg-myGreen p-14">find something unique</div>
      <div className="grid place-items-center pt-9">
        <Search handleFilters={setFilterParams} class/>
        <HomeAuctionList filters={filterParams} />
      </div>
    </div>
  );
};