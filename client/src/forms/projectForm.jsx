import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import Select from "react-select";
import {
  mockedUsersListData,
  mockedColumnsData,
} from "../assets/mocks/projectmocks";

const getUsers = async () => {
  try {
    const response = await apiService.get(API_URLS.listusers);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getColumns = async () => {
  try {
    const response = await apiService.get(API_URLS.listcolumns);
    return mockedColumnsData;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
};

const ProjectForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
    getColumns().then((columns) => setColumns(columns));
  }, []);

  const multiSelect = (
    <Select
      isMulti
      name="columns"
      options={columns.map((column) => ({
        value: column.id,
        label: column.name,
      }))}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, owner });
    setName("");
    setDescription("");
    setOwner("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Project Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="owner">
          Owner
        </label>
        <select
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        >
          <option value="">Select an owner</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="columns">
          Columns
        </label>
        {multiSelect}
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

export default ProjectForm;
