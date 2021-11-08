import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { TagContext } from "../contexts/TagContext";
import { UserContext } from "../contexts/UserContext";
import BidModal from "../components/bidModal";

export const AuctionDetails = () => {
  const { id } = useParams();
  const [activateModal, setActivateModal] = useState('init')

  const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);
  const { tags, fetchTags } = useContext(TagContext);
  const { user, fetchUser, currentUser } = useContext(UserContext);

  let btn = document.getElementById("btn-placeBid")

  useEffect(() => {
    fetchAuctionItem(id);
    fetchTags(id);
  }, [id]);

  
  useEffect(() => {
    if (auctionItem?.userId) fetchUser(auctionItem.userId);
  }, [auctionItem]);

  useEffect(() => {
    if(currentUser && btn) {
      btn.style.display = (currentUser.id == auctionItem?.userId) ? "none" : "inline"
    }
  }, [currentUser, btn])

  return (
    <div>
      <BidModal activateModal={activateModal} id={id} />
      <h1>{auctionItem.title}</h1>

      <div>
        <table>
          <tbody>
            <tr>
              <th>
                {auctionItem.highestBid ? "Highest Bid" : "Starting price"}
              </th>
              <th>Ends {auctionItem.endtime}</th>
              <th>Bids</th>
            </tr>
            <tr>
              <td>{auctionItem.highestBid || auctionItem.startPrice}</td>
              <td>TimeLeft</td>
              <td>{auctionItem.numberOfBids}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button style={{ display: "none" }} id="btn-placeBid" onClick={() => setActivateModal(!activateModal)}>Place bid</button>

      <div className="description-content">
        <h4>Description</h4>
        <p>{auctionItem.description}</p>
      </div>

      <div>
        <h4>Tags</h4>
        <p>{tags.map((tag) => `#${tag.name} `)}</p>
      </div>

      <div>
        <h4>Seller information</h4>
        <p>{user?.username}</p>
      </div>
    </div>
  );
};
