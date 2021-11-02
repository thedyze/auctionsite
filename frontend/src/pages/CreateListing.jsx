import Datepicker from "../components/Datepicker";
import { useState } from "react";

export const CreateListing = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return(
  <div>CreateListing
  <Datepicker 
   onChange={setSelectedDate(selectedDate)}/>
  </div>
  )
};
