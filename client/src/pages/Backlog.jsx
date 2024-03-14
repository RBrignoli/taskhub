import { useEffect, useState } from "react";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { useSelector } from "react-redux";
import Tooltip from "../component/Tooltip";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingIndicator from "../component/Loading";


const Backlog = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user.user);
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
  useEffect(() => {
    fetchProjects();
  }, []);
  const getColumnString = (column) => {
    switch (column) {
      case 0:
        return (
          <span className="bg-gray-300 text-gray-800 px-2 py-1 rounded-full">
            Backlog
          </span>
        );
      case 1:
        return (
          <span className="bg-red-300 text-red-800 px-2 py-1 rounded-full">
            To Do
          </span>
        );
      case 2:
        return (
          <span className="bg-yellow-300 text-yellow-800 px-2 py-1 rounded-full">
            In Progress
          </span>
        );
      case 3:
        return (
          <span className="bg-blue-300 text-blue-800 px-2 py-1 rounded-full">
            In Review
          </span>
        );
      case 4:
        return (
          <span className="bg-green-300 text-green-800 px-2 py-1 rounded-full">
            Done
          </span>
        );
      default:
        return <span>Unknown</span>;
    }
  };

  const handleEditTaskStatus = async (task) => {
    if (window.confirm("Are you sure you want to change this task status?")) {
      try {
        const column_id = task.column === 0 ? 1 : 0;
        const response = await apiService.api(
          JSON.stringify({ column: column_id }),
          API_URLS.edittask + task.id,
          "POST"
        );
        const editedTask = await response.json();
        fetchProjects();
      } catch (error) {
        alert("Error updating task:", error);
        location.reload();
        // TODO: show error message to the user
      }
    }
  };

  const handleDeleteTask = (task) => async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await apiService.api(
          "",
          API_URLS.deletetask + task.id,
          "DELETE"
        );

        if (response) {
          alert("Task deleted successfully");
        }
        fetchProjects();
      } catch (error) {
        alert("Error deleting task. Please try again later.");
      }
    }
  };

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
        {loading && (
          <tr>
            <td colSpan="4">
              <LoadingIndicator size="1" />
            </td>
          </tr>
        )}
        <ul className="my-2 p-0">
          {projects.map((project) => (
            <li
              key={project._id}
              className="rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-100"
              onClick={() => setExpandedProject(project._id)}
            >
              {project.name}
              <div>
                {expandedProject === project._id && (
                  <ul className="my-2 p-0">
                    <li className="flex rounded-none py-1.5 px-3 text-md font-medium text-blue-gray-700 hover:bg-gray-200">
                      <div className="w-1/4">Task Title</div>
                      <div className="w-1/4">Responsible</div>
                      <div className="w-1/4">Remaining Hours</div>
                      <div className="w-1/4">Status</div>
                      <div className="w-1/12">Is Active</div>
                      <div>Delete</div>
                    </li>
                    {project.tasks.map((task) => (
                      <li
                        key={task._id}
                        className="flex rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200"
                      >
                        <div className="w-1/4">
                          <Tooltip label="Task Title">{task.title}</Tooltip>
                        </div>
                        <div className="w-1/4">
                          <Tooltip label="Responsible">
                            {task.user.name}
                          </Tooltip>
                        </div>
                        <div className="w-1/4">
                          <Tooltip label="Remaining Hours">
                            {task.hoursremaining}
                          </Tooltip>
                        </div>
                        <div className="w-1/4">
                          <Tooltip label="Status">
                            {getColumnString(task.column)}
                          </Tooltip>
                        </div>
                        <Tooltip label="Active">
                          <input
                            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            defaultChecked={task.column !== 0}
                            onClick={() => handleEditTaskStatus(task)}
                          />
                        </Tooltip>
                        <Tooltip label="Delete Task">
                          <AiOutlineDelete
                            className="w-5 h-5 bg-red-500 mx-4 my-1 rounded"
                            onClick={handleDeleteTask(task)}
                          />
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Backlog;
