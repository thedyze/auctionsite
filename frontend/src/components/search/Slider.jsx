import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { refType } from "@mui/utils";

// function valuetext(value) {
//   return `${value}`;
// }

export default function RangeSlider({ filters, handleFilters }) {
  const [value, setValue] = useState([0, 1000]);

  const handleChange = (event, newValue) => {
    if (newValue[0] < -9 || newValue[1] > 1009) return;
    setValue(newValue);
    handleFilters({ ...filters, priceFrom: newValue[0], priceTo: newValue[1] });
  };

  return (
    <Box style={{zIndex:0}} sx={{ width: 200, alignItems: "center" }}>
      <Slider
        max={1010}
        min={-10}
        step={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        //getAriaValueText={valuetext}
        //size="big"
      />
    </Box>
  );
}
