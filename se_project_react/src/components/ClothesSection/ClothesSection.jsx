import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import Main from "../Main/Main.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleAddClick,
  onCardClick,
  clothingItems,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items">Your Items</p>
        <button
          className="clothes-section__items-btn"
          onClick={handleAddClick}
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
