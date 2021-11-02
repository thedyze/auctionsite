import { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";

export const CreateListing = () => {

  //Obj used to add the info and create a new listing
  const [itemObj, setItemObj] = useState({
    title: "",
    description: "",
    endTime: "",
    categoryId: "",
    startPrice: "",
    endTime: new Date().getTime(),
  });

  const handleChosenDate = (data) => {
    setItemObj({ ...itemObj, endTime: data.getTime()});
  };

  useEffect(() => {
    handleChosenDate;
    console.log("Updated Info", itemObj);
  }, [itemObj]);

  return (
    <div>
      CreateListing
      <Datepicker callback={handleChosenDate} />
    </div>
  );
};
