const mongoose = require("mongoose");
const models = require("../models/model");
const Comment = models.Comment;

const listComments = async (req, res) => {
  try {
    const task_id = req.params.id;
    const comments = await Comment.find({ task: task_id }).populate('user');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createComment = async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    task: req.body.task_id,
    user: req.user._id,
  });

  try {
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        content: req.body.content,
      },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const removedComment = await Comment.findByIdAndRemove(req.params.id);

    if (!removedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(removedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listComments,
  createComment,
  updateComment,
  deleteComment,
};
