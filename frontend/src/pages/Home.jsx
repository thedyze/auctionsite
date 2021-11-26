
import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useEffect, useState,useContext } from "react";
import { Search } from "../components/search/Search";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { Categories } from "../components/search/Categories";
import homeTop from "../images/homeTop.jpeg"; 


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
    const x = setTimeout(() => {
      fetchFilteredAuctionItems(filterParams);
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [filterParams]);




  return (
    <div className="bg-myAw">
      <div className="h-56 text-center font-logoFont -mt-2 -mb-40">
        <img src={homeTop} className="h-full w-full" alt="background-home-picture"  />
      </div>
      {/* <div className="grid place-items-center pt-9"> */}
      <div className=" flex flex-col place-items-center pt-9 -mt-8">
        <Search handleFilters={setFilterParams} class />
        <Categories handleFilters={setFilterParams} />
        <HomeAuctionList filteredAuctionItems={filteredAuctionItems} />
        <button
          className="bg-myGr-light my-2 py-2 px-8 text-base text-white rounded focus:bg-myGr-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Show more
        </button>
      </div>
    </div>
  );
};