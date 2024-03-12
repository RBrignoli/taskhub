const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  column: {
    type: Number,
    enum: [0, 1, 2, 3, 4],
    default: 0,
  },
  storypoints: {
    type: Number,
    enum: [0, 1, 2, 3, 5, 8, 12, 20],
    default: 1,
  },
  hoursspent: { type: Number, default: 0 },
  hoursestimate: { type: Number, default: 0 },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
});

TaskSchema.virtual("hoursremaining").get(function () {
  return this.hoursestimate - this.hoursspent;
});

TaskSchema.set("toJSON", { virtuals: true });
TaskSchema.set("toObject", { virtuals: true });

// const SprintSchema = new Schema({
//   name: { type: String, required: true },
//   description: String,
//   goalLine: Date,
//   started_at: { type: Date, default: Date.now },
// });

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 40 },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    is_admin: { type:Boolean, default:false },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    ownerOf: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    managed: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.createdAt;
  delete userObject.updatedAt;

  return userObject;
};

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  managers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  // columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
  // sprints: [{ type: Schema.Types.ObjectId, ref: "Sprint" }],
});

ProjectSchema.virtual("allRelatedUsers").get(function () {
  return [...this.owner, ...this.managers, ...this.members];
});

// const ColumnSchema = new Schema({
//   name: String,
//   description: String,
// });

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    task: { type: Schema.Types.ObjectId, ref: "Task" },
    content: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
// const Sprint = mongoose.model("Sprint", SprintSchema);
const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
// const Column = mongoose.model("Column", ColumnSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Task, User, Project, Comment };
