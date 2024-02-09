const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  column: { type: Schema.Types.ObjectId, ref: "Column" },
  storypoints: {
    type: Number,
    enum: [0, 1, 2, 3, 5, 8, 12, 20],
    default: 1,
  },
  hoursspent: Number,
  hoursestimate: Number,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
});



const SprintSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  goalLine: Date,
  started_at: {type: Date, default: Date.now},
});


const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 40 },
    email: { type: String, unique: true, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  sprints: [{ type: Schema.Types.ObjectId, ref: "Sprint" }],
  managers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
});

const ColumnSchema = new Schema({
  name: String,
  description: String,
});

const Task = mongoose.model("Task", TaskSchema);
const Sprint = mongoose.model("Sprint", SprintSchema);
const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Column = mongoose.model("Column", ColumnSchema);

module.exports = { Task, Sprint, User, Project, Column };
