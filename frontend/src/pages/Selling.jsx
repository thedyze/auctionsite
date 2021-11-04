import { useContext, useState, useEffect } from "react";
import { AuctionDetailsContext } from "../contexts/AuctionDetailsContext";

export const Selling = () => {
  const { userSellingItems, fetchUserSellingItems } = useContext(AuctionDetailsContext);
  const [activeItems, setActivateItems] = useState([]);
  const [inactiveItems, setInactivateItems] = useState([]);

  const now = new Date();

  let active = [];
  let inactive = [];

  useEffect(async () => {
    let res = await fetch("api/whoami");
    let user = await res.json();
    fetchUserSellingItems(user.id);

    userSellingItems.map((item) => {
      item.endTime > now ? active.push(item) : inactive.push(item);
    });

    setActivateItems(active);
    setInactivateItems(inactive);
  }, [userSellingItems]);



  return (
    <div>
      <div style={{ fontSize: "40px",textAlign:"center" }}> Current sellings</div>
      {activeItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "green" }}>{item.title} actives</div>
        </div>
      ))}
      <div style={{ fontSize: "30px",textAlign:"center" }}> History</div>

      {inactiveItems.map((item) => (
        <div key={item.id}>
          <div style={{ color: "red" }}>{item.title} inactives </div>
        </div>
      ))}
    </div>
  );
};
