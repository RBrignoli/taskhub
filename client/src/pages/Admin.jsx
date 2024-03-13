import { useEffect, useState } from "react";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { useSelector } from "react-redux";
import Tooltip from "../component/Tooltip";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingIndicator from "../component/Loading";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user.user);

  const fetchUsers = async () => {
    try {
      const response = await apiService.get(API_URLS.users);
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (user) => async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action will delete all owned projects and tasks too"
      )
    ) {
      try {
        const response = await apiService.api(
          "",
          API_URLS.users + user.id,
          "DELETE"
        );

        if (response) {
          alert("User deleted successfully");
        }
        fetchUsers();
      } catch (error) {
        alert("Error deleting user. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 px-16">
      <div className=" overflow-hidden rounded-md">
        {currentUser && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Admin</h1>
            <h2 className="text-xl font-bold mb-4">Users</h2>
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
          {users.map((user) => (
            <li
              key={user.id}
              className="flex rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200"
            >
              <div className="w-1/3">
                <Tooltip label="Task Title">{user.name}</Tooltip>
              </div>
              <div className="w-2/6">
                <Tooltip label="email">{user.email}</Tooltip>
              </div>
              <div className="w-1/12">
                <Tooltip label="createdAt">{user.createdAt}</Tooltip>
              </div>
              <div className="w-1/12">
                <Tooltip label="Role">{user.is_admin}</Tooltip>
              </div>
              <Tooltip label="Delete User">
                <AiOutlineDelete
                  className="w-5 h-5 bg-red-500 mx-4 my-1 rounded"
                  onClick={handleDeleteUser(user)}
                />
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Admin;
