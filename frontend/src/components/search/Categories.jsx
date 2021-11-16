import { useState } from "react";



export const Categories = ({ handleFilters }) => {
  //Temp names and id's duh.!
  const [categories, setCategories] = useState([
    { id: 1, name: "Shoes", isActive: false },
    { id: 4, name: "Accessories", isActive: false },
    { id: 600, name: "Dresses", isActive: false },
    { id: 603, name: "Shirts", isActive: false },
    { id: 604, name: "Pants", isActive: false },
    { id: 602, name: "Hats", isActive: false },
    { id: 601, name: "Shorts", isActive: false },
    { id: 605, name: "Jackets", isActive: false },
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
            className={"bg-myGr-light font-myPtext font-bold text-white py-1 px-3 mt-2 mb-2 rounded-3xl"}
            onClick={handleClick}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
};
