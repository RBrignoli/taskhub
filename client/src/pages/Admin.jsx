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
  const handleEditUserRole = async (user) => {
    if (window.confirm("Are you sure you want to change this user role?")) {
      try {
        await apiService.api(
          JSON.stringify({ is_admin: !user.is_admin }),
          API_URLS.users + user.id,
          "POST"
        );
      } catch (error) {
        alert("Error updating task:", error);
        location.reload();
        // TODO: show error message to the user
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
          <li className="flex rounded-none py-1.5 px-3 text-md font-medium text-blue-gray-700 hover:bg-gray-200">
            <div className="w-1/4">Name</div>
            <div className="w-1/4">Email</div>
            <div className="w-1/4">Created At</div>
            <div className="w-1/4">Is Admin</div>
            <div >Delete</div>
          </li>
          {users.map((user) => (
            <li
              key={user.id}
              className="flex rounded-none py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-gray-200"
            >
              <div className="w-1/4">
                <Tooltip label="Task Title">{user.name}</Tooltip>
              </div>
              <div className="w-1/4">
                <Tooltip label="email">{user.email}</Tooltip>
              </div>
              <div className="w-1/4">
                <Tooltip label="createdAt">{user.createdAt}</Tooltip>
              </div>
              <div className="w-1/4">
                <Tooltip label="Active">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    defaultChecked={user.isAdmin}
                    onClick={() => handleEditUserRole(user)}
                  />
                </Tooltip>
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
