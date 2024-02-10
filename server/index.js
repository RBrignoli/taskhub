require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connector");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const landingpageRoute = require("./routers/landing_page");
const columnsRoute = require("./routers/columns");
const projectsRoute = require("./routers/projects");
const tasksRoute = require("./routers/tasks");
const sprintsRoute = require("./routers/sprints");
const usersRoute = require("./routers/user");
const authRoute = require("./routers/auth");


app.use("/", landingpageRoute);
app.use("/columns", columnsRoute);
app.use("/projects", projectsRoute);
app.use("/tasks", tasksRoute);
app.use("/sprints", sprintsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

