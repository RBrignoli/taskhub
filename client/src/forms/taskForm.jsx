import React, { useEffect, useState } from "react";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import { mockedColumnsData } from "../assets/mocks/projectmocks";
import { Button } from "flowbite-react";
import Select from "react-select";

const getUsers = async (setUsers) => {
  try {
    const response = await apiService.get(API_URLS.listusers);
    setUsers(response);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [storypoint, setStorypoint] = useState(0);
  const [hoursEstimate, setHoursEstimate] = useState(0);
  const [priority, setPriority] = useState("Low");
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUsers(setUsers);
    };

    fetchData();
  }, []);
  const FormattedUsers = users.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const [selectedUser, setSelectedUser] = React.useState(
    FormattedUsers.find((option) => option.value === users.selectedUser) || null
  );

  const handleUserChange = (selectedOptions) => {
    setSelectedUser(selectedOptions);
  };
  const handleSPChange = (selectedOptions) => {
    setStorypoint(selectedOptions);
  };
  const handlePriorityChange = (selectedOptions) => {
    setPriority(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      selectedUser,
      storypoint,
      hoursEstimate,
      priority,
      isActive,
    });
    setTitle("");
    setDescription("");
    setSelectedUser("");
    setStorypoint(0);
    setHoursEstimate(0);
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Task Title
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="user">
          User
        </label>
        <div className="min-w-0 ml-4">
          <Select
            id="users"
            name="users"
            className="w-64"
            value={selectedUser}
            options={FormattedUsers}
            onChange={handleUserChange}
            placeholder="Users"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="storypoint"
        >
          Storypoint
        </label>
        <div className="mb-4">
          <Select
            className="w-64 rounded min-w-0 ml-4"
            value={storypoint}
            options={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 5, label: "5" },
              { value: 8, label: "8" },
              { value: 12, label: "12" },
              { value: 20, label: "20" },
            ]}
            onChange={handleSPChange}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="storypoint"
        >
          Priority
        </label>
        <div className="mb-4">
          <Select
            className="w-64 rounded min-w-0 ml-4"
            value={priority}
            options={[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ]}
            onChange={handlePriorityChange}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="hoursEstimate"
        >
          Hours Estimate
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="hoursEstimate"
          type="number"
          value={hoursEstimate}
          onChange={(e) => setHoursEstimate(parseFloat(e.target.value))}
          min="0"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="isActive"
        >
          Active
        </label>
        <input
          className="appearance-none border rounded w-4 h-4 leading-tight focus:outline-none focus:shadow-outline"
          id="isActive"
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
      </div>
      <Button
        className="px-2 py-1 bg-gray-800 text-white rounded-lg"
        type="submit"
      >
        Create Project
      </Button>
    </form>
  );
};

export default TaskForm;
