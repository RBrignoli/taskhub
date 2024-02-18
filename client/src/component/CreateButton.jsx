import { Button } from "flowbite-react";
import { useState } from "react";
import Modal from "./Modal";

const CreateButton = ({ form, btnText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div>
      <div>
        <Button
          className="px-2 py-1 bg-gray-800 text-white rounded-lg"
          onClick={() => handleOpenModal()}
        >
          {btnText}
        </Button>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>{form}</div>
        </Modal>
      )}
    </div>
  );
};

export default CreateButton;
