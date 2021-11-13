import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";
import { UserContext } from "../contexts/UserContext";

export const Selling = () => {
  const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
  const {currentUser} = useContext(UserContext)
  const [activeItems, setActivateItems] = useState([]);
  const [inactiveItems, setInactivateItems] = useState([]);

  const now = new Date().getTime()

    useEffect(() => {
    if (!currentUser) return;  
    fetchUserSellingItems(currentUser.id);    
    let activeTemp=[]
    let inactiveTemp=[]
      userSellingItems.map((item) => {
        item.endTime > now ? activeTemp.push(item): inactiveTemp.push(item);
      });
      setActivateItems(activeTemp)
      setInactivateItems(inactiveTemp)
    }, [userSellingItems,currentUser]);

  return (
    <div>
      <div style={{ fontSize: "40px", textAlign: "center" }}> Current sellings </div>
      {activeItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "green" }}>{item.title} active</div>
        </div>
      ))}
      <div style={{ fontSize: "30px", textAlign: "center" }}> History</div>
      {inactiveItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "red" }}>{item.title} inactive </div>
        </div>
      ))}
    </div>
  );
};
