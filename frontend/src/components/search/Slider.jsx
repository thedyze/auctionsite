import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import debounce from "lodash/debounce";

// function valuetext(value) {
//   return `${value}`;
// }

export default function RangeSlider({ handleFilters, range }) {
  const [value, setValue] = useState([0, 2000]);

  const handleDebounce = useCallback(
    debounce((range) => {
      let tempMax=range[1]
      if (tempMax==2000) tempMax=null
      handleFilters((prev) => ({
        ...prev, page: 0,
        priceFrom: range[0],
        priceTo: tempMax,
      }));
    }, 500),
    []
  );

  const handleChange = (e, data) => {
    if (data[0] < -9 || data[1] > 2009) return;
    range((p) => ({ ...p, min: data[0], max: data[1] }));
    setValue(data);
    handleDebounce(data);
    //    }, 1000);
  };

  return (
    <div className="mt-6">
      <Box sx={{ width: 200, alignItems: "center"}}>
        <Slider
     
          max={2010}
          min={-10}
          style={{ color: "#6ACF9D",thumb:"250px" }}
          step={10}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
          //getAriaValueText={valuetext}
          //size="big"
        />
      </Box>
    </div>
  );
}
