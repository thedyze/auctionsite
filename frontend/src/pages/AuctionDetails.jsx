import { useContext, useEffect, useState } from "react";
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
  const [bigImg, setBigImg] = useState('_img1.jpg')
  const [secondImg, setSecondImg] = useState('_img2.jpg')
  const [thirdImg, setThirdImg] = useState('_img3.jpg')

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
    console.log(auctionItem);
  }, [auctionItem?.userId]);


  async function handleBigImg(n) {

    if (n === 2) {
      if (bigImg === '_img1.jpg') {
        setBigImg('_img2.jpg')
        setSecondImg('_img1.jpg')
      }
      if (bigImg === '_img2.jpg') {
        setBigImg('_img1.jpg')
        setSecondImg('_img2.jpg')
      }
      if (bigImg === '_img3.jpg') {
        setBigImg('_img2.jpg')
        setSecondImg('_img1.jpg')
        setThirdImg('_img3.jpg')
      }
    }
    if (n === 3) {
      if (bigImg === '_img1.jpg') {
        setBigImg('_img3.jpg')
        setThirdImg('_img1.jpg')
      }
      if (bigImg === '_img2.jpg') {
        setBigImg('_img3.jpg')
        setSecondImg('_img2.jpg')
        setThirdImg('_img1.jpg')
      }
      if (bigImg === '_img3.jpg') {
        setBigImg('_img1.jpg')
        setThirdImg('_img3.jpg') 
      }
    }


  }

  //listen to bid changes in other auctions
  socket.on("bidUpdate", (obj)=>{
    if(obj.itemId == id) {
      setBidDetails({
        highestBid: parseInt(obj.newBid),
        numberOfBids: parseInt(bidDetails.numberOfBids) + 1
      })
    }
  });


  return (
    <div className="grid place-items-center h-screen">
      <BidModal activateModal={activateModal} id={id} />
      
      <img className="w-full p-2" src={"/uploads/" + auctionItem.imagePath + bigImg}></img>
      <div className="flex flex-row text-center">
        <img className="w-16 px-1" src={"/uploads/" + auctionItem.imagePath + secondImg} onClick={() => handleBigImg(2)}></img>
        <img className="w-16 px-1" src={"/uploads/" + auctionItem.imagePath + thirdImg} onClick={() => handleBigImg(3)}></img>
      </div>
      <div className="text-xl font-medium my-2">{auctionItem.title}</div>

      <div className="flex align-middle">
        <table className="table-fixed  w-full text-center my-2 mx-4">
          <tbody >
            <tr>
              <th className="max-h-2 text-sm font-medium ">
                {bidDetails.highestBid ? "Highest Bid" : "Starting price"}
              </th>
              <th className="max-h-2 text-sm font-medium ">Ends</th>
              <th className="max-h-2 text-sm font-medium ">Bids</th>
            </tr>
            <tr>
              <td>{bidDetails.highestBid || auctionItem.startPrice}</td>
              <td>{auctionItem.endTime}</td>
              <td>{bidDetails.numberOfBids}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full text-center px-4">
      <button disabled={!currentUser || currentUser?.id == auctionItem?.userId} id="btn-placeBid" onClick={() => setActivateModal(!activateModal)}
        className="w-full bg-myGr-light  mb-4 py-2  text-base font-medium text-white rounded border border-green focus:bg-myGr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-myGr-dark"
        >Place bid</button>
      </div>

      <div className="box-border w-11/12 bg-myAw mb-2 px-2 py-2">
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

      <div className="box-border w-11/12 bg-myAw mb-2 px-2 py-2">
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

      <div className="box-border w-11/12 bg-myAw mb-2 px-2 py-2">
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
