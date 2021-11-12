import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";

export const Selling = () => {
  const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
  const {currentUser} = useContext(UserContext)
  const [activeItems, setActivateItems] = useState([]);
  const [inactiveItems, setInactivateItems] = useState([]);

  const now = new Date();


  useEffect(() => {
    if (!currentUser) return;  
    fetchUserSellingItems(currentUser.id);    
  }, [currentUser]);

    useEffect(() => {
    if (!userSellingItems) return
      userSellingItems.map((item) => {
        item.endTime > now ? setActivateItems(i=>[...i,item]): setInactivateItems(i=>[...i,item]);
      });
    }, [userSellingItems]);

  return (
    <div>
      <div style={{ fontSize: "40px", textAlign: "center" }}> Current sellings </div>
      {activeItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "green" }}>{item.title} actives</div>
        </div>
      ))}
      <div style={{ fontSize: "30px", textAlign: "center" }}> History</div>
      {inactiveItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "red" }}>{item.title} inactives </div>
        </div>
      ))}
    </div>
  );
};
