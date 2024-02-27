import { Button } from "flowbite-react";
import { useState } from "react";
import Modal from "./Modal";

const EditButton = ({ text, form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  return (
    <div className="rounded-lg bg-green-500 w-8 h-8" onClick={handleOpenModal}>
      {text}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>{form}</div>
        </Modal>
      )}
    </div>
  );
};

export default EditButton;
