import React from "react";
import Select from "react-select";

const DashboardHeader = ({
  projects,
  users,
  onProjectChange,
  onUserChange,
}) => {
  const FormattedProjects = projects.map((option) => ({
    value: option._id,
    label: option.name,
  }));
  const FormattedUsers = users.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const [selectedProject, setSelectedProject] = React.useState(
    FormattedProjects.find(
      (option) => option.value === projects.selectedProject
    ) || null
  );
  const [selectedUser, setSelectedUser] = React.useState(
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

  return (
    <header className="bg-white shadow">
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
      </div>
    </header>
  );
};

export default DashboardHeader;
