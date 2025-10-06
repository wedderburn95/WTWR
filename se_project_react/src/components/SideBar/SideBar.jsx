import "./SideBar.css";
import { useContext } from "react";
import avatar from "../../assets/avatar.png";
import Profile from "../Profile/Profile";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt="User avatar"
      />
      <p className="sidebar__username">{currentUser?.name || "User Name"}</p>
      <p
        className="sidebar__profile-data"
        onClick={onEditProfile}
        style={{ cursor: "pointer" }}
      >
        Change profile data
      </p>

      <button className="header__signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;
