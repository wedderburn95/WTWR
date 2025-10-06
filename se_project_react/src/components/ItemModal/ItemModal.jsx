import "./ItemModal.css";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm.jsx";
import { useState, useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ItemModal({ activeModal, onClose, isOpen, card, onDelete }) {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(e.target.value);
    setIsValid(e.target.value.length >= 1 && e.target.value.length <= 30);
  };

  const [submittedGarment, setSubmittedGarment] = useState(null);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner?.toString?.() === currentUser?._id?.toString?.();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      const newGarment = {
        name: name,
        link: card.imageUrl,
        weather: card.weather,
      };
      setSubmittedGarment(newGarment);
      console.log("New garment:", newGarment);
      onClose();
    }
  };

  return (
    <div className={`modal ${activeModal === "preview" && " modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image_type"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button className="item-modal__delete" onClick={() => onDelete(card)}>
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
