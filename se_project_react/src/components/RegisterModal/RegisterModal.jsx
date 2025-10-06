import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onAltOptionClick }) => {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        avatar: "",
        email: "",
        password: "",
      });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      titleText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      onAltOptionClick={onAltOptionClick}
      registerOptionText="Login"
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
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        placeholder="Password"
      />
      {/* <div className="modal__alt-option">
        Or{" "}
        <button
          type="button"
          className="modal__alt-option-button"
          onClick={onAltOptionClick}
        >
          Log In
        </button>
      </div> */}
    </ModalWithForm>
  );
};

export default RegisterModal;
