import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { TagContext } from "../contexts/TagContext";
import { UserContext } from "../contexts/UserContext";
import BidModal from "../components/bidModal";
import { socket } from "../socket";
import { DocumentTextIcon, TagIcon, UserIcon } from "@heroicons/react/solid"; 
import { useHistory } from "react-router-dom";
import util from "../styles/util"

export const AuctionDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activateModal, setActivateModal] = useState('init')
  const [bidDetails, setBidDetails] = useState({ highestBid: 0, numberOfBids: 0 })
  const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);
  const { tags, fetchTags } = useContext(TagContext);
  const { user, fetchUser, currentUser } = useContext(UserContext);
  const [bigImg, setBigImg] = useState('_img1.jpg')
  const [secondImg, setSecondImg] = useState('_img2.jpg')
  const [thirdImg, setThirdImg] = useState('_img3.jpg')
  const disabled = (!currentUser || currentUser?.id == auctionItem?.userId)

  //listen to bid changes in other auctions
  socket.on("bidUpdate", (obj) => {
    if (obj.itemId == id) {
      setBidDetails({
        highestBid: parseInt(obj.newBid),
        numberOfBids: parseInt(bidDetails.numberOfBids) + 1
      })
    }
  });

  useEffect(() => {
    fetchAuctionItem(id);
    fetchTags(id);
  }, [id]);

  useEffect(() => {
    console.log()
    if (auctionItem?.userId) {
      fetchUser(auctionItem.userId);
      setBidDetails({
        highestBid: parseInt(auctionItem.highestBid),
        numberOfBids: parseInt(auctionItem.numberOfBids)
      })
    }
  }, [auctionItem?.userId]);

  async function handleBigImg(i) {
    const bi = bigImg[4]
    return (i == 2) ? (setBigImg(`_img${secondImg[4]}.jpg`), setSecondImg(`_img${bi}.jpg`)) : (setBigImg(`_img${thirdImg[4]}.jpg`), setThirdImg(`_img${bi}.jpg`))
  }

  const handleBtnClick = (e) => {
    if(!disabled) {
      setActivateModal(!activateModal)
    } else {
      handleDisable(e, "Place bid", "Not allowed to place bid")
    }
  }

  const goChatWithSeller = (e) => {
    if(!disabled) {
      history.push(`/conversation/${auctionItem.id}/${user.id}`);
    } else {
      handleDisable(e, "Chat with seller", "You can't chat with yourself")
    }
  }

  const handleDisable = (e, placeholder, replacer) => {
    if (currentUser) {
      e.target.innerHTML = e.target.innerHTML == placeholder ?
        "This is your item...<br>" + replacer : placeholder
    } else {
      e.target.innerHTML = e.target.innerHTML == placeholder ?
        "Sign in to " + placeholder : placeholder

      let icon = document.getElementById('userCircleIcon')
      const s = icon.style
      icon.style.borderRadius = '50%'
      icon.style.color = '#B37ECF'
      icon.style.boxShadow = '0 0 0 2px #B37ECF, 0 0 0 4px #A969C1, 0 0 0 6px #9F55B4, 0 0 0 8px #9540A6'
      setTimeout(() => {
        icon.style = s
      }, 1000)
    }
  }

  return (
    <div className="grid place-items-center h-screen">
      <BidModal activateModal={activateModal} id={id} />

      <img className="bg-myAw w-full max-h-96 h-96 object-contain p-2 " src={"/uploads/" + auctionItem.imagePath + bigImg}></img>
      <div className=" w-full flex flex-row justify-center pt-2 pb-2">
        <img className="max-w-14 max-h-14 object-contain px-1 " src={"/uploads/" + auctionItem.imagePath + secondImg} onClick={() => handleBigImg(2)}></img>
        <img className="max-w-14 max-h-14 object-contain px-1" src={"/uploads/" + auctionItem.imagePath + thirdImg} onClick={() => handleBigImg(3)}></img>
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
        <button 
        onClick={(e) => handleBtnClick(e)}
        className={'w-full ' + util.btn + util.btnGreen + util.btnDisabled({disabled})}
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
          <button 
          onClick={(e)=>goChatWithSeller(e)} 
          className={'float-right ' + util.btn + util.btnGreen + util.btnDisabled({disabled})}
          >Chat with seller</button>
        </div>
      </div>
    </div>
  );
};
