import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, onAltOptionClick }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(form);
  };

  useEffect(() => {
    if (!isOpen) {
      setForm({ email: "", password: "" }); // Reset form when modal closes
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      onAltOptionClick={onAltOptionClick}
      registerOptionText="Register"
    >
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
    </ModalWithForm>
  );
};

export default LoginModal;
