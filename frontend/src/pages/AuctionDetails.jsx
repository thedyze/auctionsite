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
import CountdownTimer from "../components/CountdownTimer";


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

  //listen to bid changes in other auctions
  useEffect(()=>{
    socket.on("bidUpdate", (obj) => {
      if (obj.itemId == id) fetchAuctionItem(id);
    });
  },[])

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
    if(disabled || isInactive) {
      handleDisable(e, "Place bid", "Not allowed to place bid")
    } else {
      setActivateModal(!activateModal)
    }
  }

  const goChatWithSeller = (e) => {
    if(!disabled) {
      history.push(`/conversation/${auctionItem.id}/${user.id}`);
    } else {
      handleDisable(e, "Chat with seller", "You can't chat with yourself", 1)
    }
  }

  const handleDisable = (e, placeholder, replacer, skip) => {
    if(isInactive && !skip) {
      e.target.innerHTML = e.target.innerHTML == placeholder ?
        "This item has expired" : placeholder
    } else if (currentUser) {
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
              <th className={util.th}>
                {auctionItem.highestBid ? "Highest Bid" : "Starting price"}
              </th>
              <th className={util.th}>Ends</th>
              <th className={util.th}>Bids</th>
            </tr>
            <tr>
              <td>{auctionItem.highestBid || auctionItem.startPrice}</td>
              <td className="text-myRe">{<CountdownTimer auctionEndTime={auctionItem?.endTime} />}</td>
              <td>{auctionItem.numberOfBids}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full text-center px-4">
        <button 
        onClick={(e) => handleBtnClick(e)}
          className={'w-full ' + util.btn + util.btnGreen + util.btnDisabled(disabled || isInactive)}
        >Place bid</button>
      </div>

      <div className={util.box}>
        <div>
          <DocumentTextIcon
            className={util.icon}
            aria-hidden="true" />
          <div className={util.iconText}>
            Description
          </div>
        </div>
        <div>
          {auctionItem.description}
        </div>
      </div>

      <div className={util.box}>
        <div>
          <TagIcon
            className={util.icon}
            aria-hidden="true" />
          <div className={util.iconText}>
            Tags
          </div>
          <div>
            {tags.map((tag) => `#${tag.name} `)}
          </div>
        </div>
      </div>

      <div className={util.box}>
        <div>
          <UserIcon
            className={util.icon}
            aria-hidden="true" />
          <div className={util.iconText}>
            Seller Information
          </div>
          <div>
            {user?.username}
          </div>
          <button 
          onClick={(e)=>goChatWithSeller(e)} 
          className={'float-right ' + util.btn + util.btnGreen + util.btnDisabled(disabled)}
          >Chat with seller</button>
        </div>
      </div>
    </div>
  );
};
