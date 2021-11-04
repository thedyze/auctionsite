import { RangeFilter } from "./RangeFilter";
import { SearchInput } from "./SearchInput";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Categories } from "./Categories";

export const Search = ({ filters, handleFilters }) => {
  const [value, setValue] = useState(0);
  const [showSlider, setShowSlider] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue !== 0) {
      handleFilters({ ...filters, priceFrom: null, priceTo: null });
      setShowSlider(false);
    } else setShowSlider(true);
    console.log(showSlider);
  };

  return (
    <div>
      <SearchInput filters={filters} handleFilters={handleFilters} />
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Price" name="price" />
          <Tab label="Popular" name="popular" />
          <Tab label="Latest" name="latest" />
        </Tabs>
      </Box>
      {showSlider && (
        <RangeFilter filters={filters} handleFilters={handleFilters} />
      )}
      <br />
      <Categories filter={filters} handleFilters={handleFilters} />
    </div>
  );
};
