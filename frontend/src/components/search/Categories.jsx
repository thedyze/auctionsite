import { useState } from "react";



export const Categories = ({ handleFilters }) => {
  //Temp names and id's duh.!
  const [categories, setCategories] = useState([
    { id: 1, name: "Shoes", isActive: false },
    { id: 4, name: "Accessories", isActive: false },
    { id: 600, name: "Cat3", isActive: false },
    { id: 603, name: "cat7", isActive: false },
    { id: 604, name: "cat6", isActive: false },
    { id: 602, name: "cat5", isActive: false },
    { id: 601, name: "cat4", isActive: false },
    { id: 605, name: "cat8", isActive: false },
  ]);

  const handleClick = (e) => {
    let temp = [];
    let counter = 0;

    categories.map((cat) => {
      if (cat.id.toString() === e.target.name) {
        cat.isActive = !cat.isActive;
        handleFilters((prev) => ({ ...prev, page: 0, categoryId: e.target.name }));
      } else {
        cat.isActive = false;
      }
      temp.push(cat);
    });

    temp.map((el) => {
      !el.isActive && counter++;
    });

    if (counter === 8) handleFilters((prev) => ({ ...prev, page: 0, categoryId: null }));

    setCategories(temp);
  };

  return (
    <>
      
      <div style={{ width: "95%", display: "flex", overflow: "scroll", paddingLeft: "0.5em", paddingRight: "1.5em" }}>
        {categories.map((cat) => (
          <button
            style={cat.isActive ? { color: "white", background:"#35825C" } : { color: "white" }}
            key={cat.id}
            name={cat.id}
            className={"bg-myGr-light font-medium text-white py-2 px-3 mt-2 mb-2 rounded-3xl"}
            onClick={handleClick}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
};
