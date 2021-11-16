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
import CountdownTimer from "../components/CountdownTimer"

export const AuctionDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activateModal, setActivateModal] = useState('init')
  const { auctionItem, fetchAuctionItem } = useContext(AuctionDetailsContext);
  const { tags, fetchTags } = useContext(TagContext);
  const { user, fetchUser, currentUser } = useContext(UserContext);
  const [bigImg, setBigImg] = useState('_img1.jpg')
  const [secondImg, setSecondImg] = useState('_img2.jpg')
  const [thirdImg, setThirdImg] = useState('_img3.jpg')
  const [disabled, setDisabled] = useState(false)
  const [isInactive, setIsInactive] = useState(false)
  const [currentTime] = useState(new Date().getTime());

  //listen to bid changes in other auctions
  useEffect(() => {
    socket.on("bidUpdate", (obj) => {
      if (obj.itemId == id) fetchAuctionItem(id);
    });
  }, [])

  useEffect(() => {
    fetchAuctionItem(id);
    fetchTags(id);
  }, [id]);

  useEffect(() => {
    if (auctionItem?.userId) {
      fetchUser(auctionItem.userId)
      setDisabled(!currentUser || currentUser?.id == auctionItem?.userId)
      setIsInactive(auctionItem?.endTime < new Date().getTime() || auctionItem?.highestBid >= auctionItem?.buyNowPrice)
    }
  }, [auctionItem?.userId, currentUser]);

  async function handleBigImg(i) {
    const bi = bigImg[4]
    return (i == 2) ? (setBigImg(`_img${secondImg[4]}.jpg`), setSecondImg(`_img${bi}.jpg`)) : (setBigImg(`_img${thirdImg[4]}.jpg`), setThirdImg(`_img${bi}.jpg`))
  }

  const handleBtnClick = (e) => {
    userWon()
    if (disabled || isInactive) {
      handleDisable(e, "Place bid", "Not allowed to place bid")
    } else {
      setActivateModal(!activateModal)
    }
  }

  const goChatWithSeller = (e) => {
    if (!disabled) {
      history.push(`/conversation/${auctionItem.id}/${user.id}`);
    } else {
      handleDisable(e, "Chat with seller", "You can't chat with yourself", 1)
    }
  }

  const handleDisable = (e, placeholder, replacer, skip) => {
    if(isInactive && !skip) {
      e.target.innerHTML = "This item has expired"
    } else if (currentUser) {
      e.target.innerHTML = "This is your item...<br>" + replacer
    } else {
      e.target.innerHTML = "Sign in to " + placeholder

      let icon = document.getElementById('iconRef')
      icon.click()
      setTimeout(() => {
        icon.click();
      }, 1000)
    }
    setTimeout(() => {
      e.target.innerHTML = placeholder
    }, 1000)
  }

  const userWon = () => {
    console.log("auctionItem?.highestBid ", auctionItem?.highestBid)
    console.log("auctionItem ", auctionItem)
    console.log("auctionItem?.userId ", auctionItem?.userId)
    console.log("currentUser?.id ", currentUser?.id)
    //if(isInactive && currentUser.id === auctionItem?.userId && auctionItem?.highestBid === bid.bid)
    // if(currentUser.id === this.bid.userId){
      
    // }
   
  }

  return (
    <div className="grid place-items-center gap-5 mb-9">
      <BidModal activateModal={activateModal} id={id} />

      <img className="bg-myAw w-full max-h-96 h-96 object-contain p-2 " src={"/uploads/" + auctionItem.imagePath + bigImg}></img>
      <div className=" w-full flex flex-row justify-center">
        <img className="max-w-14 max-h-14 object-contain px-1 " src={"/uploads/" + auctionItem.imagePath + secondImg} onClick={() => handleBigImg(2)}></img>
        <img className="max-w-14 max-h-14 object-contain px-1" src={"/uploads/" + auctionItem.imagePath + thirdImg} onClick={() => handleBigImg(3)}></img>
      </div>
      <div className="text-xl font-myPtext">{auctionItem.title}</div>

      <div className="flex align-middle w-full text-center mx-4 font-myPtext">
        <div className="w-1/3 border-r-2 border-gray-100">
          <div className="font-bold">{auctionItem.highestBid ? "Highest Bid" : "Starting price"}</div>
          <div>{auctionItem.highestBid || auctionItem.startPrice}</div>
        </div>
        <div className="w-1/3 border-r-2 border-gray-100">
          <div className="font-bold">Ends</div>
          <CountdownTimer auctionEndTime={auctionItem.endTime} />
        </div>
        <div className="w-1/3">
          <div className="font-bold">Bids</div>
          <div>{auctionItem.numberOfBids}</div>
        </div>

      </div>
      <div className="w-full text-center px-4 font-myPtext">
        {(auctionItem.endTime - currentTime > currentTime ) ?
        <div>Time limit passed</div>
        :
          <button
            onClick={(e) => handleBtnClick(e)}
            className={'w-3/5 h-14 text-lg ' + util.btn + util.btnGreen + util.btnDisabled(disabled || isInactive)}
          >Place bid</button>
        }
      </div>

      <div className={"font-myPtext " + util.box}>
        <div>
          <DocumentTextIcon
            className={util.icon}
            aria-hidden="true" />
          <div className={"font-bold " + util.iconText}>
            Description
          </div>
        </div>
        <div>
          {auctionItem.description}
        </div>
      </div>

      <div className={"font-myPtext " + util.box}>
        <div>
          <TagIcon
            className={util.icon}
            aria-hidden="true" />
          <div className={"font-myPtext font-bold " + util.iconText}>
            Tags
          </div>
          <div>
            {tags.map((tag) => `#${tag.name} `)}
          </div>
        </div>
      </div>

      <div className={"font-myPtext font-bold " + util.box}>
        <div className="flex justify-between items-center">
          <div className="">
            <span>
              <UserIcon
                className={util.icon}
                aria-hidden="true" />
            </span>
            <span>
              {user?.username}
            </span>
          </div>
          <button
            onClick={(e) => goChatWithSeller(e)}
            className={"my-0 " + util.btn + util.btnGreen + util.btnDisabled(disabled)}
          >Chat with seller
          </button>
        </div>
      </div>
    </div>
  );
};
