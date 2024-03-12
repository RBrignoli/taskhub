import { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { useParams } from "react-router-dom";


const DashboardColumn = ({
  title,
  tasks,
  column_id,
  fetchTasks,
  setTasks,
  project,
  users,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTaskColumn(item.id, column_id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const { projectId } = useParams();


  const moveTaskColumn = async (id, column_id) => {
    try {
      const response = await apiService.api(
        JSON.stringify({ column: column_id }),
        API_URLS.edittask + id,
        "POST"
      );
      const editedTask = await response.json();
      fetchTasks(setTasks, projectId, users);
      location.reload()
    } catch (error) {
      alert("Error updating task:", error);
      location.reload();
      // TODO: show error message to the user
    }
  };

  useEffect(() => {
    setTasks(tasks);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-h-screen" ref={drop}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="bg-gray-100 p-2 rounded-md h-32 z-20">
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardColumn;
