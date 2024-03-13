import { useState, useEffect } from "react";
import Select from "react-select";
import CreateButton from "../component/CreateButton";
import TaskForm from "../forms/taskForm";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";

const DashboardHeader = ({ projects, onProjectChange, onUserChange }) => {
  const [users, setUsers] = useState([]);

  const FormattedUsers = users.map((option) => ({
    value: option._id,
    label: option.name,
  }));
  const FormattedProjects = projects.map((option) => ({
    value: option._id,
    label: option.name,
  }));

  const [selectedProject, setSelectedProject] = useState();
  
  useEffect(() => {
    if (selectedProject) {
      const selectedProjectObj = projects.find(
        (project) => project._id.toString() === selectedProject.value
      );
      setUsers(selectedProjectObj ? selectedProjectObj.allRelatedUsers : []);
    } else {
      setUsers([]);
    }
  }, [selectedProject, projects]);

  const [selectedUser, setSelectedUser] = useState(
    FormattedUsers.find((opt) => opt.value === users.selectedUser) || null
  );

  const handleProjectChange = (selectedOption) => {
    setSelectedProject(selectedOption);
    onProjectChange(selectedOption.value);
  };

  const handleUserChange = (selectedOptions) => {
    const userIds = selectedOptions.map((option) => option.value);
    setSelectedUser(selectedOptions);
    onUserChange(userIds);
  };

  const onSubmit = async (task) => {
    try {
      const { isActive, ...taskWithoutIsActive } = task;
      const columnValue = isActive ? 1 : 0;
      const updatedTask = { ...taskWithoutIsActive, column: columnValue };
      const response = await apiService.api(
        JSON.stringify(updatedTask),
        API_URLS.createtask,
        "POST"
      );
      const newTask = await response.json();
      alert("New task created:", task);
      location.reload();
    } catch (error) {
      alert("Error creating task:", error);
      // TODO: show error message to the user
    }
  };

  return (
    <header className="bg-white">
      <div className="mx-auto py-6 flex">
        <div className="min-w-0">
          <Select
            id="projects"
            name="projects"
            className="w-32"
            value={selectedProject}
            options={FormattedProjects}
            onChange={handleProjectChange}
            placeholder="Project"
          />
        </div>
        <div className="min-w-0 ml-4">
          <Select
            id="users"
            name="users"
            className="w-64"
            value={selectedUser}
            options={FormattedUsers}
            onChange={handleUserChange}
            placeholder="Users"
            isMulti
          />
        </div>
        <div className="ml-auto">
          <CreateButton
            form={<TaskForm onSubmit={onSubmit} />}
            btnText="Create Task"
            className="ml-auto"
          ></CreateButton>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
