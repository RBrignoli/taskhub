import { useEffect, useState } from "react";
import DashboardColumn from "./DashboardColumn";
import {
  mockedColumnsData,
  mockedTasksData,
} from "../assets/mocks/projectmocks";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";

const fetchColumns = async (setColumns) => {
  try {
    setColumns(mockedColumnsData); //TODO dinamically add columns
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const fetchTasks = async (setTasks, project, users) => {
  try {
    const queryParams = {};
    if (project.project) {
      queryParams.project = project.project;
    }
    if (project.user > []) {
      queryParams.users = project.user;
    }
    const response = await apiService.get(API_URLS.listtasks, queryParams);
    setTasks(response);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const KanbanBoard = (project, users) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchColumns(setColumns);
    fetchTasks(setTasks, project, users);
  }, [users, project]);
  const tasksByColumn = {};
  columns.forEach((column) => {
    tasksByColumn[column.id] = tasks.filter(
      (task) => task.column === column.id
    );
  });

  return (
    <ul className={"grid grid-cols-4 gap-4 max-h-100"}>
      {columns.map((column) => (
        <li key={column.id} className="bg-gray-100 p-2 rounded-md max-h-100">
          <DashboardColumn
            title={column.title}
            tasks={tasksByColumn[column.id]}
            column_id={column.id}
            fetchTasks={fetchTasks}
            setTasks={setTasks}
            project={project}
            users={users}
          />
        </li>
      ))}
    </ul>
  );
};

export default KanbanBoard;
