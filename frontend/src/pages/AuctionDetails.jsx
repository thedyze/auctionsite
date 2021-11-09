import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { TagContext } from "../contexts/TagContext";
import { UserContext } from "../contexts/UserContext";
import BidModal from "../components/bidModal";
import { socket } from "../socket";
import { DocumentTextIcon, TagIcon, UserIcon } from "@heroicons/react/solid"; 

export const AuctionDetails = () => {
  const { id } = useParams();
  const [activateModal, setActivateModal] = useState('init')
  const [bidDetails, setBidDetails] = useState({highestBid:0, numberOfBids:0})
  const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);
  const { tags, fetchTags } = useContext(TagContext);
  const { user, fetchUser, currentUser } = useContext(UserContext);

  let btn = document.getElementById("btn-placeBid")

  useEffect(() => {
    fetchAuctionItem(id);
    fetchTags(id);
  }, [id]);

  useEffect(() => {
    if (auctionItem?.userId) {
      fetchUser(auctionItem.userId);
      setBidDetails({
         highestBid: parseInt(auctionItem.highestBid), 
         numberOfBids: parseInt(auctionItem.numberOfBids)})
      }
  }, [auctionItem?.userId]);

  //listen to bid changes in other auctions
  socket.on("bidUpdate", (obj)=>{
    if(obj.itemId == id && temp) {
      setBidDetails({
        highestBid: parseInt(obj.newBid),
        numberOfBids: parseInt(bidDetails.numberOfBids) + 1
      })
    }
  });


  return (
    <div className="bg-myAw grid place-items-center h-screen">
      <BidModal activateModal={activateModal} id={id} />
      <img className="w-full bg-red-500" src="" alt="Bild saknas"></img>

      <div className="text-xl font-medium my-5">
        {auctionItem.title}
      </div>

      <div>
        <table className="table-fixed w-full text-center my-5">
          <tbody>
            <tr>
              <th>
                {bidDetails.highestBid ? "Highest Bid" : "Starting price"}
              </th>
              <th>Ends {auctionItem.endTime}</th>
              <th>Bids</th>
            </tr>
            <tr>
              <td>{bidDetails.highestBid || auctionItem.startPrice}</td>
              <td>TimeLeft</td>
              <td>{bidDetails.numberOfBids}</td>
            </tr>
          </tbody>
        </table>
      </div>    
      <button disabled={!currentUser || currentUser?.id == auctionItem?.userId} id="btn-placeBid" onClick={() => setActivateModal(!activateModal)}
        className="bg-myGr-light my-2 py-2 px-8 text-sm text-white rounded border border-green focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
      >Place bid</button>

      <div className="box-border w-11/12 bg-white px-2 py-2">
        <div>
          <DocumentTextIcon
            className="h-5 w-5 text-black float-left"
            aria-hidden="true" />
          <div className="font-medium ml-6">
            Description
          </div>
        </div>
        <div>
          {auctionItem.description}
        </div>
      </div>

      <div className="box-border w-11/12 bg-myAw px-2 py-2">
        <div>
          <TagIcon
            className="h-5 w-5 text-black float-left"
            aria-hidden="true" />
          <div className="font-medium ml-6">
            Tags
          </div>
          <div>
            {tags.map((tag) => `#${tag.name} `)}
          </div>
        </div>
      </div>

      <div className="box-border w-11/12 bg-white px-2 py-2">
        <div>
          <UserIcon
            className="h-5 w-5 text-black float-left"
            aria-hidden="true" />
          <div className="font-medium ml-6">
            Seller Information
          </div>
          <div>
            {user?.username}
          </div>
          <button className="float-right bg-myGr-light py-2 px-6 text-sm text-white rounded border border-green focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
          >Chat with seller</button>
        </div>
      </div>
    </div>
  );
};
