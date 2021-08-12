import { useEffect } from "react";
import { createPortal } from "react-dom";

const ModalRoot = document.querySelector("#modal-root");

function Modal({ onClose, image }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (e.code !== "Escape") {
      return;
    }
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };
  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick} role="presentation">
      <div className="Modal">
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    ModalRoot
  );
}

export default Modal;
