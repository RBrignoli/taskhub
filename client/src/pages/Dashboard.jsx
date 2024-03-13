import { useState, useEffect } from "react";
import KanbanBoard from "../component/kanbanBoard";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import DashboardHeader from "../component/DashboardHeader";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useParams, useNavigate } from "react-router-dom";

const fetchUsers = async (setUsers, selectedProject) => {
  try {
    const queryParams = { project: selectedProject };
    const response = await apiService.get(API_URLS.users, queryParams);
    setUsers(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
const fetchProjects = async (setProjects) => {
  try {
    const response = await apiService.get(API_URLS.listprojects);
    setProjects(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const Dashboard = () => {
  const { projectId } = useParams();
  const [selectedProject, setSelectedProject] = useState(projectId ? (projectId): (''));
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects(setProjects);
  }, [selectedProject]);

  const handleProjectChange = (value) => {
    setSelectedProject(value);
    navigate(`/dashboard/${value}`);
  };

  const handleUserChange = (value) => {
    setSelectedUser(value);
  };
  return (
    <div className="container mx-auto mt-8 px-16">
      <h1 className="text-3xl font-bold mb-4">DashBoard</h1>
      <DashboardHeader
        projects={projects}
        onProjectChange={handleProjectChange}
        onUserChange={handleUserChange}
      />
      <DndProvider backend={HTML5Backend}>
        <KanbanBoard project={selectedProject} user={selectedUser} />
      </DndProvider>
    </div>
  );
};

export default Dashboard;
