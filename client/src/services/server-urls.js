// apiUrls.js
const API_URLS = {
  signup: "/auth/signup",
  signin: "/auth/signin",
  logout: "/auth/logout",
  users: "/users/",
  createproject: "/projects/",
  listprojects: "/projects/",
  deleteprojects: "/projects/",
  editproject: "/projects/",
  listcolumns: "/columns/",
  listtasks: "/tasks/",
  createtask: "/tasks/",
  edittask: "/tasks/",
  deletetask: "/tasks/",
  comments: "/comments/",
};

const API_BASE_URL =
  process.env.NODE_ENV == "production"
    ? "https://taskhub-s37f.onrender.com"
    : "http://localhost:8000";
  
export {
  API_URLS,
  API_BASE_URL
};