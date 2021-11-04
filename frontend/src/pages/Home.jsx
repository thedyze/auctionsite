
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
    buttonSelection: null,
  });

  //check current filter params
  console.log(filterParams);

  return (
    <div className="bg-gray-700 grid place-items-center h-screen">
      <div className="text-yellow-500 text-base text-center">Hidden Gems</div>
      <Search filters={filterParams} handleFilters={setFilterParams} />
      <HomeAuctionList filters={filterParams} />
    </div>
  );
};