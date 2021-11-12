import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import debounce  from "lodash/debounce"

export const SearchInput = ({  handleFilters }) => {
  const [state, setState] = useState(false);

  const handleDebounce = useCallback(
    debounce((searchVal) => {
      handleFilters((prev)=>({ ...prev, page: 0, search: searchVal }));
    setState(false);

    }, 2500)
  );


  const handleSearch = (e) => {
    setTimeout(()=>{
      setState(true);

    },1000)
    handleDebounce(e.target.value);
  };

  return (
    <div>
      {state && <div>Loading....</div>}
      <Box sx={{ width: 300, maxWidth: "100%" }}>
        <TextField
          color="info"
          fullWidth
          label="Search"
          onChange={handleSearch}
        />
      </Box>
    </div>
  );
};