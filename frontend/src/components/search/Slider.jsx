import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import debounce from "lodash/debounce";

// function valuetext(value) {
//   return `${value}`;
// }

export default function RangeSlider({ handleFilters, range }) {
  const [value, setValue] = useState([0, 1000]);

  const handleDebounce = useCallback(
    debounce((range) => {
      handleFilters((prev) => ({
        ...prev, page: 0,
        priceFrom: range[0],
        priceTo: range[1],
      }));
    }, 1500),
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
    <Box style={{ zIndex: 0 }} sx={{ width: 200, alignItems: "center" }}>
      <Slider
        max={2010}
        min={-10}
          style={{ zIndex: 0, color: "#9540A6" }}
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
