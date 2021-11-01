import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
export const Home = () => {
  return (
    <div className="bg-gray-700 h-screen">
      <div className="text-yellow-500 text-4xl text-center">Hidden Gems</div>
    </div>
  );
};
export const Datepick = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={subDays(new Date(), 5)}
      placeholderText="Select a date after 5 days ago"
    />
  );
};
