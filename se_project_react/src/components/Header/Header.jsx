import { Link } from "react-router-dom";
import "./Header.css";
import avatar from "../../assets/avatar.png";
import wtwr from "../../assets/wtwr.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  handleSignOut,
  weatherData,
  isLoggedIn,
  onAuthLinkClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const getUserInitial = (name) => name?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="header">
      <div className="header__container">
        {/* Left side: Logo and Date */}
        <div className="header__left">
          <Link to="/">
            <img className="header__logo" src={wtwr} alt="Header Logo" />
          </Link>
          <p className="header__date-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        {/* Right side */}
        <div className="header__right">
          {isLoggedIn ? (
            <>
              <ToggleSwitch />
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__profile-link">
                <div className="header__profile">
                  <p className="header__username">{currentUser?.name}</p>
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar || def}
                      alt={currentUser.name}
                      className="header__avatar"
                    />
                  ) : (
                    <div className="header__avatar-placeholder">
                      {getUserInitial(currentUser?.name)}
                    </div>
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <button
                className="header__auth-button"
                onClick={() => {
                  onAuthLinkClick("register");
                }}
              >
                Sign Up
              </button>
              <button
                className="header__auth-button"
                onClick={() => onAuthLinkClick("login")}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
