import { useEffect, useState } from "react";
import apiService from "../services/api";
import API_URLS from "../services/server-urls";
import { useSelector } from "react-redux";
import Tooltip from "../component/Tooltip";

const Backlog = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const { currentUser } = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiService.get(API_URLS.listprojects);
        console.log(response);

        setProjects(response);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-16">
      <div className=" overflow-hidden rounded-md">
        {currentUser && (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {currentUser.name}!
            </h1>
            <h2 className="text-xl font-bold mb-4">Your projects</h2>
          </div>
        )}
        <ul className="my-2 p-0">
          {projects.map((project) => (
            <li
              key={project._id}
              className="rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:border-b hover:border-gray-400"
              onClick={() =>
                setExpandedProject(
                  expandedProject === project._id ? null : project._id
                )
              }
            >
              {project.name}
              {expandedProject === project._id && (
                <ul className="my-2 p-0">
                  {project.tasks.map((task) => (
                    <li
                      key={task._id}
                      className="flex rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:border-b hover:border-gray-300"
                    >
                      <div className="w-1/3">
                        <Tooltip label="Task Title">{task.title}</Tooltip>
                      </div>
                      <div className="w-2/6">
                        <Tooltip label="Responsible">{task.user.name}</Tooltip>
                      </div>
                      <div className="w-1/12">
                        <Tooltip label="Remaining Hours">
                          {task.hoursremaining}
                        </Tooltip>
                      </div>
                      <div className="w-1/12">
                        <Tooltip label="Status">{task.column}</Tooltip>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Backlog;
