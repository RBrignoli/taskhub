import { Button } from "flowbite-react";
import { useState } from "react";
import Modal from "./Modal";

const EditButton = ({ text, form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div>
      <div onClick={handleOpenModal}>
        {text}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>{form}</div>
        </Modal>
      )}
    </div>
  );
};

export default EditButton;
