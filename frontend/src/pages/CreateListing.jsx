import { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";
import { ImageUpload } from "../components/ImageUpload.jsx"

export const CreateListing = () => {

  //Obj used to add the info and create a new listing
  const [auctionData, setAuctionData] = useState({
    title: "",
    description: "",
    startTime: new Date().getTime(),
    categoryId: "",
    startPrice: "",
    buyNowPrice: "",
    endTime: new Date().getTime()
  });

  const categories = [
    {
      name: "Shoes",
      id: 1
    },
    { id: 4, name: "Accessories" },
    { id: 1000, name: "Dresses" },
    { id: 1001, name: "Shirts" },
    { id: 1002, name: "Pants" },
    { id: 1003, name: "Hats" }
  ]

  useEffect(() => {
    console.log("Updated Info", auctionData);
  }, [auctionData]);


  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log("im in submit function")

    //time when submitted
    let currentDateAndTime = new Date();
    setAuctionData({ ...auctionData, startTime: currentDateAndTime.getTime() });

    let a = auctionData;
    let newAuction = {
      title: a.title,
      description: a.description,
      startTime: new Date().getTime(),
      categoryId: a.categoryId,
      startPrice: a.startPrice,
      buyNowPrice: a.buyNowPrice,
      endTime: a.endTime
    };
    console.log("newAuction before fetch", newAuction);
  }

  return (
    <form className="p-6" onSubmit={handleFormSubmit}>
      <div className="font-bold text-2xl text-center p-8">Create a listing</div>
      <div className="pt-8">Upload photo</div>
      {/* <ImageUpload /> */}

      {/* Title input */}
      <div className="pt-8">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="title"
            id="title"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="Title"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
      </div>

      {/* Description input */}
      <div className="pt-8">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="description"
            id="description"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="Description"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
        </div>
      </div>

      {/* Category input */}
      <div className="pt-8">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>

        <div>
          <select
            id="category"
            name="category"
            className="w-full focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, categoryId: e.target.value }));
            }}
          >
            {categories.map((cat) => <option key={cat.id}>{cat.id}</option>)}
          </select>
        </div>
      </div>

      {/* Price input */}
      <div className="pt-8">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Starting price</label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="0"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, startPrice: e.target.value }));
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              <option>SEK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buy Now input */}
      <div className="flex justify-between pt-8">
        <div className="flex items-center">
          <input
            id="buy-now"
            name="buy-now"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="buy-now" className="ml-2 block text-sm text-gray-900">
            Buy now
          </label>
        </div>
        <div className="mt-1 relative rounded-md shadow-sm w-40">
          <input
            type="text"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
            placeholder="0"
            onChange={(e) => {
              setAuctionData((prev) => ({ ...prev, buyNowPrice: e.target.value }));
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              <option>SEK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Set end Date */}
      <div className="pt-8">
        <label htmlFor="end-date" className="ml-2 block text-sm text-gray-900">
          End Date
        </label>
        <Datepicker callback={setAuctionData}/>
      </div>
      <div className="flex justify-center pt-8">
        <button
          type="submit"
          className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Done
        </button>
      </div>
    </form>
  );
};

