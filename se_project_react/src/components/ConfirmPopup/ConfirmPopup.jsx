import "./ConfirmPopup.css";

function ConfirmPopup({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-popup">
      <div className="confirm-popup__content">
        <p>
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <button className="confirm-popup__confirm" onClick={onConfirm}>
          Yes, delete item
        </button>
        <button className="confirm-popup__cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
