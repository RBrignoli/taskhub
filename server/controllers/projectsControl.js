const mongoose = require("mongoose");
const models = require("../models/model");
const Project = models.Project;
const User = models.User;
const Task = models.Task;

function removeDuplicates(array) {
  return array.filter((value, index, self) => {
    return self.findIndex(item => item._id.toString() === value._id.toString()) === index;
  });
}

const listProjects = async (req, res) => {
  try {
    let query = {};
    if (!req.user.admin) {
      query = {
        $or: [
          { owner: req.user._id },
          { members: req.user._id },
          { managers: req.user._id },
        ],
      };
    }
    const projects = await Project.find(query)
      .populate("owner")
      .populate("members")
      .populate("managers");
      const populateTasks = async (projects) => {
        for (const project of projects) {
          const tasks = await Task.find({ project: project._id }).populate(
            "user"
          );
          project.tasks = tasks;
        }
      };

      await populateTasks(projects);
    const modifiedProjects = projects.map((project) => ({
      ...project._doc,
      owner: project.owner._doc,
      allRelatedUsers: removeDuplicates([
        project.owner,
        ...project.managers,
        ...project.members,
      ]),
    }));
    res.json(modifiedProjects);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("columns");
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  const project = new Project(req.body);
  try {
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  const requester_id = req.user._id;
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.owner.toString() !== requester_id && !req.user.admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Project.findByIdAndRemove(projectId);

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
