import "./AddItemModal.css";
import ModalWithForm from "../../components/ModalWithForm/ModalWithForm.jsx";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onHandleAddItemSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!open) {
      setName("");
      setImageUrl("");
      setWeatherType("");
      setIsValid(false);
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsValid(
      newName.length >= 1 && imageUrl.length > 0 && weatherType.length > 0
    );
  };

  const handleImageUrlChange = (e) => {
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);
    setIsValid(
      name.length >= 1 && newImageUrl.length > 0 && weatherType.length > 0
    );
  };

  const handleWeatherTypeChange = (e) => {
    const newWeatherType = e.target.value;
    setWeatherType(newWeatherType);
    setIsValid(
      name.length >= 1 && imageUrl.length > 0 && newWeatherType.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onHandleAddItemSubmit({ name, imageUrl, weatherType })
      .then(() => {
        setName("");
        setImageUrl("");
        setWeatherType("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
      setIsValid(false);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Add Garment"
      titleText="New Garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        NAME{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="clothing-name"
          placeholder="Name"
          required
          minLength={1}
          maxLength={30}
          onChange={handleNameChange}
          value={name}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="clothing-link"
          placeholder="imageUrl"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-button">
        <legend className="modal__legend">Select the weather type:</legend>
        <label
          htmlFor="hot"
          className={`modal__label modal__label_type_radio ${
            weatherType === "hot" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            name="weathertype"
            id="choiceHot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "hot"}
          />
          Hot
        </label>

        <label
          htmlFor="warm"
          className={`modal__label modal__label_type_radio ${
            weatherType === "warm" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            name="weathertype"
            id="choiceWarm"
            type="radio"
            className="modal__radio-input"
            placeholder="Warm"
            value="warm"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "warm"}
          />
          Warm
        </label>

        <label
          htmlFor="cold"
          className={`modal__label modal__label_type_radio ${
            weatherType === "cold" ? "modal__label_type_radio--selected" : ""
          }`}
        >
          <input
            name="weathertype"
            id="choiceCold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherTypeChange}
            checked={weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
