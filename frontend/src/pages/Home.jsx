import { Search } from "../components/search/Search";
import { HomeAuctionList } from "../lists/HomeAuctionList";

export const Home = () => {
  return (

    <div className="bg-gray-700 grid place-items-center h-screen">
      <div className="text-yellow-500 text-base text-center">Hidden Gems</div>
    <Search />
      <HomeAuctionList/>
    </div>
  )
};