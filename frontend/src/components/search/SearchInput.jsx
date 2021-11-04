import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const SearchInput = ({ filters, handleFilters }) => {
  const handleSearch = (e) => {
    setTimeout(() => {
      handleFilters({ ...filters, search: e.target.value });
    }, 1000);
  };

  return (
    <div>
      <Box sx={{ width: 300, maxWidth: "100%" }}>
        <TextField
          color="info"
          fullWidth
          label="Search"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
    </div>
  );
};
