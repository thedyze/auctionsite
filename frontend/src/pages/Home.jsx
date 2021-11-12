
import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useEffect, useState } from "react";
import { Search } from "../components/search/Search";


export const Home = () => {
  const [page, setPage] = useState(0)

  // DEFAULT FILTER PARAMETERS IN HOME PAGE. EVERYTHING IS SET TO NULL
  const [filterParams, setFilterParams] = useState({
    search: null,
    categoryId: null,
    priceFrom: null,
    priceTo: null,
    buttonSelection: "default",
    page: page
  });

  useEffect(() => {
    if(page !== 0) {
      setFilterParams((prev) => ({ ...prev, page: page }))
    }
  }, [page])

  useEffect(() => {
    if(filterParams.page == 0 && page != 0) setPage(0)
  }, [filterParams])

  return (
    <div>
      <div className="text-center font-logoFont bg-myGreen p-14">find something unique</div>
      <div className="grid place-items-center pt-9">
        <Search handleFilters={setFilterParams} class/>
        <HomeAuctionList filters={filterParams} />
        <button className="bg-myGr-light my-2 py-2 px-8 text-sm text-white rounded focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark" onClick={() => {setPage(page + 1)}}>Show more</button>
      </div>
    </div>
  );
};