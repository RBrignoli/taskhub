import { useState, useEffect} from "react";
import CreateButton from "../component/CreateButton";
import EditButton from "../component/EditButton";
import ProjectForm from "../forms/projectForm";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../component/Loading";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const onSubmitEdit = async (project) => {
    try {
      const response = await apiService.api(
        JSON.stringify(project),
        API_URLS.editproject + project.project._id,
        "POST"
      );
      const editedProject = await response.json();
      alert("Project Updated");
      location.reload();
    } catch (error) {
      alert("Error updating project:", error);
      location.reload();
      // TODO: show error message to the user
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        const response = await apiService.api(
          "",
          API_URLS.deleteprojects + projectId,
          "DELETE"
        );
        if (response) {
          alert("Project deleted successfully");
        }
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
        setLoading(false);
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
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4">
                  <LoadingIndicator size="1" />
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="border-b border-gray-200 py-4 px-4">
                  <Link to={`/dashboard/${project._id}`}>
                    <h2 className="text-xl font-bold mb-2 block hover:underline">
                      {project.name}
                    </h2>
                  </Link>
                </td>
                <td className="border-b border-gray-200 py-4 px-4">
                  <p className="text-gray-600 mb-2">{project.description}</p>
                </td>
                <td className="border-b border-gray-200 py-4 px-4">
                  <p className="text-gray-800">
                    {project.owner.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </p>
                </td>
                <td className="border-b border-gray-200 py-4 px-4 grid grid-cols-2">
                  <Button
                    color="failure"
                    className="flex items-center justify-center w-8 h-8"
                    onClick={() => {
                      handleDelete(project._id);
                    }}
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                  </Button>
                  <EditButton
                    text={<AiOutlineEdit className="w-5 h-5 m-1" />}
                    form={
                      <ProjectForm onSubmit={onSubmitEdit} project={project} />
                    }
                    className="ml-auto"
                  ></EditButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
