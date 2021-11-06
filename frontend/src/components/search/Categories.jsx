import { useState } from "react";

const BUTTON_STYLE =
  "bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full";

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
        handleFilters((prev) => ({ ...prev, categoryId: e.target.name }));
      } else {
        cat.isActive = false;
      }
      temp.push(cat);
    });

    temp.map((el) => {
      !el.isActive && counter++;
    });

    if (counter === 8) handleFilters((prev) => ({ ...prev, categoryId: null }));

    setCategories(temp);
  };

  return (
    <>
      <div style={{ width: "300px", display: "flex", overflow: "scroll" }}>
        {categories.map((cat) => (
          <button
            style={cat.isActive ? { color: "red" } : { color: undefined }}
            key={cat.id}
            name={cat.id}
            className={BUTTON_STYLE}
            onClick={handleClick}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
};
