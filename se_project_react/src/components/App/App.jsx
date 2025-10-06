import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import {
  coordinates,
  APIkey,
  weatherOptions,
  defaultClothingItems,
  defaultWeatherOptions,
} from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

import Profile from "../Profile/Profile.jsx";
import {
  addNewClothingItem,
  getItems,
  updateUserInfo,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import ConfirmPopup from "../ConfirmPopup/ConfirmPopup.jsx";

import { register, authorize, getUserData } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");

  const [selectedCard, setSelectedCard] = useState({});

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // to control confirm popup
  const [itemToDelete, setItemToDelete] = useState(null); // store which item to delete

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleRegister = (formData) => {
    register(formData)
      .then(() =>
        handleLogin({ email: formData.email, password: formData.password })
      )
      .catch((err) => console.error(err));
  };

  const handleChange = ({ name, avatar }) => {
    updateUserInfo({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Failed  to update user info:", err));
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        fetchUser(res.token);
        closeActiveModal();
      })
      .catch((err) => console.error(err));
  };

  const fetchUser = (token) => {
    getUserData(token)
      .then((userData) => setCurrentUser(userData))
      .catch((err) => {
        console.error("Invalid token", err);
        setIsLoggedIn(false);
      });
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true); // open the confirm popup
  };

  const handleConfirmDelete = () => {
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== itemToDelete._id)
        );
        setIsConfirmDeleteOpen(false);
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    // setForm({});
  };

  const handleAddItemSubmit = ({ name, imageUrl, weatherType }) => {
    //add the the new item to the server
    return addNewClothingItem({ name, imageUrl, weatherType })
      .then((newItem) => {
        // adds the new item locally/visually to the dom
        setClothingItems([newItem, ...clothingItems]);
        // closing the modal
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add Item", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const likeAction = !isLiked ? addCardLike : removeCardLike;

    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        // ToDo - set the clothing items to the data from the api
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUser(token);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onAuthLinkClick={setActiveModal}
            />

            <Routes>
              <Route
                path="/"
                element={
                  //ToDo - pass clothing items as a prop to the Main component
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteClick}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <div className="page-with-profile">
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleSignOut={() => {
                          localStorage.removeItem("jwt");
                          setIsLoggedIn(false);
                          setCurrentUser({});
                        }}
                        onEditProfile={() => setActiveModal("edit-profile")}
                        onCardLike={handleCardLike}
                      />
                    </div>
                  ) : (
                    <Navigate
                      to="/"
                      // Main
                      // weatherData={weatherData}
                      // onCardClick={handleCardClick}
                      // clothingItems={clothingItems}
                    />
                  )
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onHandleAddItemSubmit={handleAddItemSubmit}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            onDelete={handleDeleteClick}
          />
          <ConfirmPopup
            isOpen={isConfirmDeleteOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onAltOptionClick={() => setActiveModal("login")}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onAltOptionClick={() => setActiveModal("register")}
          />
          <EditProfileModal
            key={`${currentUser._id || "guest"}-${activeModal}`}
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onChange={handleChange}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
