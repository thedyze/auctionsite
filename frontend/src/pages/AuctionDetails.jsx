import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { TagContext } from "../contexts/TagContext";
import { UserContext } from "../contexts/UserContext";


export const AuctionDetails = () => {

  const { id } = useParams()

  const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext)
  const { tags, fetchTags } = useContext(TagContext)
  const { user, fetchUser } = useContext(UserContext)

  useEffect(() => {
    fetchAuctionItem(id)
    fetchTags(id)
  }, [id])
  useEffect(() => {
    if(auctionItem?.userId) fetchUser(auctionItem.userId)
  }, [auctionItem])

  return (
    <div>
      <h1>{auctionItem.title}</h1>

      <div>
        <table>
          <tbody>
            <tr>
              <th>{auctionItem.currentBid ? 'Current bid' : 'Starting price'}</th>
              <th>Ends {auctionItem.endtime}</th>
              <th>Bids</th>
            </tr>
            <tr>
              <td>{auctionItem.currentBid || auctionItem.startPrice}</td>
              <td>TimeLeft</td>
              <td>{auctionItem.numberOfBids}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button>Place bid</button>

      <div className="description-content">
        <h4>Description</h4>
        <p>{auctionItem.description}</p>
      </div>

      <div>
        <h4>Tags</h4>
        <p>{tags.map(tag => `#${tag.name} `)}</p>
      </div>

      <div>
        <h4>Seller information</h4>
        <p>{user?.username}</p>
      </div>
    </div>
  )
};
