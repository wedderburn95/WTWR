import "./ModalWithForm.css";

function ModalWithForm({
  children,
  titleText,
  isOpen,
  onClose,
  buttonText = "Log In",
  onSubmit,
  isValid = true,
  registerOptionText,
  onAltOptionClick,
}) {
  return (
    <div className={`modal ${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{titleText}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            {/* <img src="" alt="Close Button" /> */}
          </button>
        </div>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-group">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>
            {registerOptionText && (
              <p className="modal__alt-option">
                or{" "}
                <button
                  type="button"
                  className="modal__alt-link"
                  onClick={onAltOptionClick}
                >
                  {registerOptionText}
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
