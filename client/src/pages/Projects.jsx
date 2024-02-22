import { useState, useEffect, React } from "react";
import CreateButton from "../component/CreateButton";
import EditButton from "../component/EditButton";
import ProjectForm from "../forms/projectForm";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "flowbite-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmit = async (project) => {
    try {
      const response = await apiService.api(
        JSON.stringify(project),
        API_URLS.createproject,
        "POST"
      );
      const newProject = await response.json();
      alert("New project created:", newProject.name);
      location.reload();
    } catch (error) {
      alert("Error creating project:", error);
      // TODO: show error message to the user
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        await apiService.api("", API_URLS.deleteprojects + projectId, "DELETE");

        alert("Project deleted successfully");
        location.reload();
      } catch (error) {
        alert("Error deleting project. Please try again later.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiService.get(API_URLS.listprojects);
        setProjects(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-16">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>
      <div className="flex justify-end">
        <CreateButton
          form={<ProjectForm onSubmit={onSubmit} />}
          btnText="Create Project"
          className="ml-auto"
        ></CreateButton>
      </div>
      <div className="mt-4">
        <ul className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-white rounded p-4 shadow-md flex flex-row items-start justify-between"
            >
              <div>
                <EditButton
                  form={<ProjectForm onSubmit={onSubmit} project={project} />}
                  text={
                    <h2 className="text-xl font-bold mb-2 block hover:underline">
                      {project.name}
                    </h2>
                  }
                  className="ml-auto"
                ></EditButton>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <p className="text-gray-800">
                  <span className="font-bold">Owner:</span> {project.owner.name}
                </p>
              </div>
              <Button
                color="failure"
                className="flex items-center justify-center w-8 h-8"
                onClick={() => {
                  handleDelete(project._id);
                }}
              >
                <AiOutlineDelete className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
