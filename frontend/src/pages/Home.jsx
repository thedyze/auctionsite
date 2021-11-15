
import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useEffect, useState,useContext } from "react";
import { Search } from "../components/search/Search";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { Categories } from "../components/search/Categories";


export const Home = () => {
  const [page, setPage] = useState(0)
  const { filteredAuctionItems, fetchFilteredAuctionItems } = useContext(AuctionDetailsContext);

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


  useEffect(() => {
    setTimeout(() => {
      fetchFilteredAuctionItems(filterParams);
    }, 250);
    return clearTimeout();
  }, [filterParams]);



  return (
    <div className="">
      <div className="bg-homebg bg-cover h-48 text-center font-logoFont bg-myGreen -mt-2 -mb-40">
      </div>
      {/* <div className="grid place-items-center pt-9"> */}
      <div className=" flex flex-col place-items-center pt-9 -mt-8">
        <Search handleFilters={setFilterParams} class/>
        <Categories  handleFilters={setFilterParams} />
        <HomeAuctionList filteredAuctionItems={filteredAuctionItems} />
        <button className="bg-myPr-dark my-2 py-2 px-8 text-sm text-white rounded focus:bg-myPr-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myPr-dark" onClick={() => {setPage(page + 1)}}>Show more</button>
      </div>
    </div>
  );
};