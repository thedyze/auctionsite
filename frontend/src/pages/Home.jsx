import { HomeAuctionList } from "../lists/HomeAuctionList";

export const Home = () => {
  return (
    <div className="bg-gray-700 h-screen">
      <div className="text-yellow-500 text-4xl text-center">Hidden Gems</div>
      <HomeAuctionList/>
    </div>
  );
};
