import { useState } from "react";
import shoesIcon from "../../images/Shoe.webp"
import dressIcon from "../../images/Dress.webp";
import hatIcon from "../../images/Hat.webp";
import shirtIcon from "../../images/Shirt.webp";
import accessoriesIcon from "../../images/Accessories.webp";
import pantsIcon from "../../images/Pants.webp";
import shortsIcon from "../../images/Shorts.webp";
import jacketIcon from "../../images/Jacket.webp";



export const Categories = ({ handleFilters }) => {
  //Temp names and id's duh.!
  const [categories, setCategories] = useState([
    { id: 1,   iconSrc: shoesIcon,  isActive: false , name: "Shoes"},
    { id: 4,   iconSrc: accessoriesIcon,  isActive: false , name: "Accessories"},
    { id: 600, iconSrc: dressIcon,  isActive: false , name: "Dresses"},
    { id: 603, iconSrc: shirtIcon,  isActive: false , name: "Shirts"},
    { id: 604, iconSrc: pantsIcon,  isActive: false , name: "Pants"},
    { id: 602, iconSrc: hatIcon,    isActive: false , name: "Hats"},
    { id: 601, iconSrc: shortsIcon,  isActive: false , name: "Shorts"},
    { id: 605, iconSrc: jacketIcon,  isActive: false , name: "Jackets"},
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
        <div className="catContainer flex justify-between">
          {categories.map((cat) => (
               <img
                onClick={handleClick}
                className={`${cat.isActive ? "border-myPr-light border-2 outline-myPrlight bg-myPr-dark": "bg-myPr-light"} outline-grey font-myPtext font-bold text-white my-2 mx-1 h-16 rounded-full`}
                key={cat.id}
                name={cat.id}
                src={cat.iconSrc}
                alt={cat.name}
              />))}
        </div>
  );
};
