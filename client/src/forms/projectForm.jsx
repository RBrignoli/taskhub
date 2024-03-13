import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import Select from "react-select";


const fetchUsers = async (setUsers) => {
  try {
    const response = await apiService.get(API_URLS.users);
    setUsers(response);
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const ProjectForm = ({ onSubmit, project = null }) => {
  const [name, setName] = useState(project ? project.name : "");
  const [description, setDescription] = useState(
    project ? project.description : ""
  );
  const [owner, setOwner] = useState(project ? project.owner._id : "");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState("");
  const [managers, setManagers] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers(setUsers);
    };

    fetchData();
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const managedIds = managers.map((user) => user.value);
    const memberIds = members.map((user) => user.value);
    onSubmit({ name, description, owner, project, managers: managedIds, members: memberIds });
    setName("");
    setDescription("");
    setOwner("");
  };
  
  const FormattedUsers = users.map((option) => ({
    value: option.id,
    label: option.name,
  }));

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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="members">
          Managers
        </label>
        <Select
          isMulti
          options={FormattedUsers}
          onChange={setManagers}
          loadOptions={FormattedUsers}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="members">
          Members
        </label>
        <Select
          isMulti
          options={FormattedUsers}
          onChange={setMembers}
          loadOptions={FormattedUsers}
        />
      </div>
      <Button
        className="px-2 py-1 bg-gray-800 text-white rounded-lg"
        type="submit"
      >
        {project ? "Edit Project" : "Create Project"}
      </Button>
    </form>
  );
};

export default ProjectForm;
