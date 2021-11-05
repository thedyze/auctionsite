import { RangeFilter } from "./RangeFilter";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Categories } from "./Categories";

export const Search = ({ handleFilters }) => {
  const [value, setValue] = useState(0);
  const [showSlider, setShowSlider] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue !== 0) {
      handleFilters((prev)=>({ ...prev, priceFrom: null, priceTo: null }));
      setShowSlider(false);
    } else setShowSlider(true);
    console.log(showSlider);
  };

  return (
    <div>
      <SearchInput  handleFilters={handleFilters} />
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Price" name="price" />
          <Tab label="Popular" name="popular" />
          <Tab label="Latest" name="latest" />
        </Tabs>
      </Box>
      {showSlider && (
        <RangeFilter  handleFilters={handleFilters} />
      )}
      <br />
      <Categories handleFilters={handleFilters} />
    </div>
  );
};
