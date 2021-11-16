import {useState } from "react";
import RangeSlider from "./Slider";

export const RangeFilter = ({ handleFilters }) => {
  const[range,setRange] =useState({
    min: 0,
    max:2000
  })

  return (
      <div className="flex justify-between content-between items-center">
        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            width: "30px",
          }}
        >
          {range.min}
        </div>
        <RangeSlider  range={setRange} handleFilters={handleFilters} />
        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            width: "35px",
          }}
        >
          {range.max}
        </div>
      </div>
  );
};
