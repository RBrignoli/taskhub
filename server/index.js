require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connector");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/auth.yaml'); // O caminho para o seu arquivo YAML


const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: [process.env.client_url, process.env.prod_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const landingpageRoute = require("./routers/landing_page");
// const columnsRoute = require("./routers/columns");
const projectsRoute = require("./routers/projects");
const tasksRoute = require("./routers/tasks");
// const sprintsRoute = require("./routers/sprints");
const usersRoute = require("./routers/user");
const authRoute = require("./routers/auth");
const commentsRoute = require("./routers/comments");



app.use("/", landingpageRoute);
// app.use("/columns", columnsRoute);
app.use("/projects", projectsRoute);
app.use("/tasks", tasksRoute);
// app.use("/sprints", sprintsRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/comments", commentsRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error ";
  res.status(statusCode).json({ success: false, statusCode, message });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

