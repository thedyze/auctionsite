import { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";

export const CreateListing = () => {

  //Obj used to add the info and create a new listing
  const [itemObj, setItemObj] = useState({
    title: "",
    description: "",
    startTime: "",
    categoryId: "",
    startPrice: "",
    endTime: new Date().getTime(),
  });

  console.log(itemObj.endTime)

  return (
    <div>
      CreateListing
      <Datepicker callback={setItemObj} callObj={itemObj} />
    </div>
  );
};
