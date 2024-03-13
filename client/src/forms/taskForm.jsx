import React, { useEffect, useState } from "react";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { Button } from "flowbite-react";

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

const fetchProjects = async (setProjects) => {
  try {
    const response = await apiService.get(API_URLS.listprojects);
    setProjects(response);
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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers(setUsers);
      await fetchProjects(setProjects);
    };

    fetchData();
  }, []);
  const FormattedUsers = users.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const FormattedProjects = projects.map((option) => ({
    value: option._id,
    label: option.name,
  }));

  const [selectedUser, setSelectedUser] = React.useState(
    FormattedUsers.find((option) => option.value === users.selectedUser) || null
  );

  const [selectedProject, setSelectedProject] = React.useState(
    FormattedProjects.find(
      (option) => option.value === projects.selectedProject
    ) || null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      user: selectedUser,
      storypoint,
      hoursestimate: hoursEstimate,
      project: selectedProject,
      priority,
      isActive,
    });
    setTitle("");
    setDescription("");
    setSelectedUser("");
    setSelectedProject("");
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
          <select
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="owner"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="project">
          Project
        </label>
        <div className="min-w-0 ml-4">
          <select
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            required
          >
            <option value="">Select a Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
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
          <select
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="storypoint"
            value={storypoint}
            onChange={(e) => setStorypoint(parseInt(e.target.value, 10))}
            required
          >
            <option value="">StoryPoint</option>
            {[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 5, label: "5" },
              { value: 8, label: "8" },
              { value: 12, label: "12" },
              { value: 20, label: "20" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
          <select
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="owner"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Priority</option>
            {[
              { value: "Low", label: "Low" },
              { value: "Medium", label: "Medium" },
              { value: "High", label: "High" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;
