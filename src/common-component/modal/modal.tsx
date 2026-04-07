import { createPortal } from "react-dom";
import "./modal.scss";

interface modalContainer {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  isOverlayVisible: boolean;
}

const Modal = ({ title, children, onClose }: modalContainer) => {
  return createPortal(
    <>
      <div className="overlay-visible"></div>
      <div className="modal-container">
        <div className="modal-header">
          <span className="bold-text-medium">{title}</span>
          <img src="global/assets/icons/close-icon.png" onClick={onClose} />
        </div>

        <div className="modal-children">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
