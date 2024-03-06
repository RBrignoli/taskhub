import React from "react";
import PropTypes from "prop-types";


const Modal = ({ isOpen, onClose, children }) => {
  const modalOverlayStyle = isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";
  const modalContentStyle = isOpen ? "transform translate-y-0" : "transform -translate-y-full";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${modalOverlayStyle} transition-opacity duration-300 backdrop-blur-sm`}
    >
      <div
        className="absolute w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className={`relative bg-white rounded-lg p-6 z-50 max-w-lg h-4/6 overflow-y-auto ${modalContentStyle} transition-transform duration-300 z-20`}
      >
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;