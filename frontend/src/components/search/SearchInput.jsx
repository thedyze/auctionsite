import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import debounce  from "lodash/debounce"

export const SearchInput = ({  handleFilters }) => {
  // const [state, setState] = useState(false);

  const handleDebounce = useCallback(
    debounce((searchVal) => {
      handleFilters((prev)=>({ ...prev, page: 0, search: searchVal }));
  //  setState(false);

    }, 500)
  );


  const handleSearch = (e) => {
    handleDebounce(e.target.value);
  };

  return (
    <div style={{ width: "75%" }}>
      {/* {state && <div>Loading....</div>} */}
      <Box>
        <TextField
          className="bg-white rounded-md"
          color="secondary"
          fullWidth
          label="Search"
          onChange={handleSearch}
        />
      </Box>
    </div>
  );
};