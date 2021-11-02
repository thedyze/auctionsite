import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { subDays,addDays } from 'date-fns';

const [endDate, setEndDate] = useState(new Date());

export default function Datepicker() {
  return(
    <DatePicker
    showPopperArrow={false}
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    minDate={subDays(new Date(), -1)}
    maxDate={addDays(new Date(), 30)}
    dateFormat="dd/MM yyyy h:mm"
    placeholderText="Select a date"
    />
  )
};
