import "./ItemCard.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item?.likes) &&
    item.likes.some((id) => id === currentUser?._id);
  console.log(isLiked);

  const isOwner =
    item.owner &&
    currentUser._id &&
    item.owner.toString() === currentUser._id.toString();

  const itemLikedButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__like-name">
        <img
          onClick={() => {
            onCardClick(item);
          }}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
        <div className="card__overlay">
          <h2 className="card__name">{item.name}</h2>
          {currentUser._id && (
            <button
              type="button"
              className={itemLikedButtonClassName}
              onClick={handleLike}
            />
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
