import RangeSlider from "./Slider";

export const RangeFilter = ({ filters, handleFilters }) => {
  //console.log(filters.priceFrom, " Betweeen ", filters.priceTo);

  return (
    <>
      <div className="flex justify-between content-between items-center">
        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            width: "30px",
          }}
        >
          {filters.priceFrom || 0}
        </div>
        <RangeSlider filters={filters} handleFilters={handleFilters} />
        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            width: "35px",
          }}
        >
          {filters.priceTo || 1000}
        </div>
      </div>
    </>
  );
};
