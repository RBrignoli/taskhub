import React, { useState, useEffect } from "react";
import { mockedCommentsData } from "../assets/mocks/projectmocks";

const fetchComments = async (setComments, task) => {
  try {
    setComments(mockedCommentsData); //TODO dinamically add comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const TaskModal = ({ isOpen, onClose, task }) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    console.log(commentContent);
  };


  useEffect(() => {
    fetchComments(setComments, task);
  }, [task]);
  const modalOverlayStyle = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";
  const modalContentStyle = isOpen
    ? "transform translate-y-0"
    : "transform -translate-y-full";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${modalOverlayStyle} transition-opacity duration-300 backdrop-blur-sm z-40`}
    >
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full bg-black opacity-50" onClick={onClose}></div>
        <div
          className={`bg-white rounded-lg p-6 w-4/6 h-4/6 justify-center absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 ${modalContentStyle} transition-transform duration-300 z-50`}
        >
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            Close
          </button>
          <div className="flex">
            <div className="w-3/5">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p>{task.description}</p>
              <div className="w-5/6 relative mt-2">
                <textarea
                  className="w-full p-2 border rounded-lg"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-lg "
                  onClick={handleAddComment}
                >
                  {">"}
                </button>
              </div>
              <div className="mt-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <div>{comment.content}</div>
                    <div className="text-gray-500 text-sm">
                      {comment.user.name} at {comment.createdAt.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/5">
              <h3 className="text-lg font-semibold mb-2">Task Details</h3>
              <ul>
                <li className="mt-0">Column: {task.column}</li>
                <li className="mt-3">Priority: {task.priority}</li>
                <li className="mt-3">Estimated Hours: {task.hoursestimate}</li>
                <li className="mt-3">Spent Hours: {task.hoursspent}</li>
                <li className="mt-3">Remaining Hours: {task.hoursremaining}</li>
                <li className="mt-3">Project: {task.project.name}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
