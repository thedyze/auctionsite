import { useState, useEffect } from "react";
import Datepicker from "../components/Datepicker";
import { ImageUpload } from "../components/ImageUpload.jsx"

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


  return (
    <div>
      CreateListing
      <ImageUpload />
      <Datepicker callback={setItemObj} callObj={itemObj} />
    </div>
  );
};

