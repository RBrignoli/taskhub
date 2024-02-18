import { useState, useEffect, React } from "react";
import CreateButton from "../component/CreateButton";
import { mockedProjectsData } from "../assets/mocks/projectmocks";
import { Link } from "react-router-dom";
import ProjectForm from "../forms/projectForm";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const onSubmit = async (project) => {
    try {
      const newProject = await apiService.api(
        JSON.stringify(project),
        API_URLS.createproject,
        "POST"
      );
      alert("New project created:", newProject.name);
    } catch (error) {
      alert("Error creating project:", error);
      // TODO: show error message to the user
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiService.get(API_URLS.listprojects);
        console.log(response);
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
      <div className="flex justify-end">
        <CreateButton
          form={<ProjectForm onSubmit={onSubmit} />}
          btnText="Create Project"
          className="ml-auto"
        ></CreateButton>
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-bold mb-4">Projects</h1>
        <ul className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-white rounded p-4 shadow-md flex flex-col"
            >
              <Link
                to={`/dashboard/${project.id}`}
                className="block hover:underline"
              >
                <h2 className="text-xl font-bold mb-2 flex flex-col">
                  {project.name}
                </h2>
              </Link>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-gray-800">
                <span className="font-bold">Owner:</span> {project.owner.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
