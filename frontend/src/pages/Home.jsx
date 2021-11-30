
import { HomeAuctionList } from "../lists/HomeAuctionList";
import { useEffect, useState,useContext } from "react";
import { Search } from "../components/search/Search";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { Categories } from "../components/search/Categories";
import homeTop from "../images/homeTop.jpeg"; 
import { RefreshIcon, ChevronDoubleDownIcon } from "@heroicons/react/outline";
import util from "../styles/util";


export const Home = () => {
  const [page, setPage] = useState(0)
  const { filteredAuctionItems, fetchFilteredAuctionItems, noMoreItems, fetching, setFetching } = useContext(AuctionDetailsContext);

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
    if (filterParams.page == 0 && page != 0) setPage(0)
    const x = setTimeout(() => {
      fetchFilteredAuctionItems(filterParams);
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [filterParams]);

  useEffect(() => {
    let lastCard = document.querySelectorAll('[id^="lastCard"]')
    if(lastCard.length === 0) return
    
    let observer = new IntersectionObserver((entries) => {
      if (!entries[entries.length - 1].isIntersecting) return
      lastCard[0].removeAttribute('id')
      setFetching(true)
      setPage(p => p+1)
    })
    let target = lastCard[0]
    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  },[filteredAuctionItems])


  return (
    <div id="home" className="bg-myAw">
      <div className="h-56 text-center font-logoFont -mt-2 -mb-40">
        <img src={homeTop} className="h-full w-full" alt="background-home-picture"  />
      </div>
      {/* <div className="grid place-items-center pt-9"> */}
      <div className=" flex flex-col place-items-center pt-9 -mt-8">
        <Search handleFilters={setFilterParams} class />
        <Categories handleFilters={setFilterParams} />
        <HomeAuctionList filteredAuctionItems={filteredAuctionItems} />

        {fetching && 
        <div id="spinner">
          <RefreshIcon
            className={util.icon + "mb-4 text-myGr-dark animate-spin"}
            aria-hidden="true" />
        </div>}
        
        <div>
          {noMoreItems && <div className="-mt-2 mb-2">No more items</div>}
        </div>
      </div>
    </div>
  );
};