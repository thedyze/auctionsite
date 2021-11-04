import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import debounce  from "lodash/debounce"

export const SearchInput = ({  handleFilters }) => {
  const [state, setState] = useState(false);

  const handleDebounce = useCallback(
    debounce((searchVal) => {
      handleFilters((prev)=>({ ...prev, search: searchVal }));
    setState(false);

    }, 1000)
  );

  const handleSearch = (e) => {
    setState(true);
    handleDebounce(e.target.value);
  };

  return (
    <div>
      {state&& <div>loading...</div>}
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