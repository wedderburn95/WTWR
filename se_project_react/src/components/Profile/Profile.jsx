import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import Main from "../Main/Main.jsx";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleSignOut,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleSignOut={handleSignOut} onEditProfile={onEditProfile} />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
