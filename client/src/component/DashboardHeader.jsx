import React from "react";
import Select from "react-select";
import CreateButton from "../component/CreateButton";
import TaskForm from "../forms/taskForm";



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

  const onSubmit = async (task) => {
    try {
      
      // const response = await apiService.api(
      //   JSON.stringify(project),
      //   API_URLS.createproject,
      //   "POST"
      // );
      // const newProject = await response.json();
      alert("New task created:", task);
      location.reload();
    } catch (error) {
      alert("Error creating project:", error);
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
            form={<TaskForm onSubmit={onSubmit} />} // TODO: add the create Task form
            btnText="Create Task"
            className="ml-auto"
          ></CreateButton>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
