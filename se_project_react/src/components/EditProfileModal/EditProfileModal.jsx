import React, { useState, useEffect, useContext } from "react";
import "./EditProfileModal.css";
import Profile from "../../components/Profile/Profile";
import { updateUserInfo } from "../../utils/api";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onChange }) => {
  const currentUser = useContext(CurrentUserContext);
  const [form, setForm] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(form);
  };

  return (
    <ModalWithForm
      titleText="Edit profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Edit User"
    >
      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Name"
      />
      <input
        name="avatar"
        type="url"
        value={form.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
    </ModalWithForm>
  );
};

export default EditProfileModal;
