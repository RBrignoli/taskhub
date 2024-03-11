import { useState, useEffect } from "react";
import apiService from "../services/api";
import { API_URLS } from "../services/server-urls";
import { AiOutlineDelete } from "react-icons/ai";

const fetchComments = async (setComments, task) => {
  try {
    const response = await apiService.get(API_URLS.comments + task.id);
    setComments(response);
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

const TaskModal = ({ isOpen, onClose, task }) => {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [hoursSpent, setHoursSpent] = useState(task.hoursspent);
  const [taskObj, setTaskObj] = useState(task);
  const [remainingHours, setRemainingHours] = useState(task.hoursremaining >= 0 ? task.hoursremaining : 0);


  const handleAddComment = async () => {
    try {
      await apiService.api(
        JSON.stringify({'task_id': task.id, 'content': commentContent}),
        API_URLS.comments,
        "POST"
      );
      fetchComments(setComments, task);
    } catch (error) {
      alert("Error creating comment. Please try again later.");
    }
  };
  const handleDeleteComment = (comment) => async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await apiService.api("", API_URLS.comments + comment._id, "DELETE");
        fetchComments(setComments, task);
      } catch (error) {
        alert("Error deleting comment. Please try again later.");
      }
    }
  };

  const handleAddhours = async () => {
    try {
      const response = await apiService.api(
        JSON.stringify({ hoursspent: hoursSpent }),
        API_URLS.edittask + task.id,
        "POST"
      );
      const editedTask = await response.json();
      setRemainingHours(editedTask.hoursremaining);
      alert("Task Updated");
    } catch (error) {
      alert("Error updating task:", error);
      location.reload();
      // TODO: show error message to the user
    }
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
        <div
          className="absolute w-full h-full bg-black opacity-50"
          onClick={onClose}
        ></div>
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
              <h2 className="text-xl font-semibold mb-2">{taskObj.title}</h2>
              <p>{taskObj.description}</p>
              <div className="w-11/12 relative mt-2">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  className="absolute right-0 h-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm bg-gray-800 text-white"
                  onClick={handleAddComment}
                >
                  {">"}
                </button>
              </div>
              <div className="mt-2 max-h-fit overlay-y-auto">
                {comments.map((comment) => (
                  <div key={comment._id} className="mb-2 border border-gray-300 w-11/12">
                    <div>{comment.content}</div>
                    <div className="text-gray-500 text-sm flex">
                      {comment.user.name} at {comment.createdAt}
                      <AiOutlineDelete
                        className="w-4 h-4 bg-red-500 mx-2 my-1"
                        onClick={handleDeleteComment(comment)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/5">
              <h3 className="text-lg font-semibold mb-2">Task Details</h3>
              <ul>
                <li className="mt-0">Column: {taskObj.column}</li>
                <li className="mt-3">Priority: {taskObj.priority}</li>
                <li className="mt-3">Estimated Hours: {taskObj.hoursestimate}</li>
                <li className="mt-3 relative">
                  Spent Hours
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    type="number"
                    value={hoursSpent}
                    onChange={(e) => setHoursSpent(e.target.value)}
                  />
                  <button
                    onClick={() => handleAddhours()}
                    className="absolute right-0 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm bg-gray-800 text-white"
                  >
                    Set Hours
                  </button>
                </li>
                <li className="mt-3">Remaining Hours: {remainingHours}</li>
                {/* <li className="mt-3">Project: {taskObj.project.name}</li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
