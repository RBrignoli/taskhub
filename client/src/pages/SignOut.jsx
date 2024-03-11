import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../services/server-urls";
import apiService from "../services/api";

const SignOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    localStorage.clear()
    const response = await apiService.api(
      "",
      API_URLS.logout,
      "POST"
    );
    dispatch(signOutSuccess());
    navigate("/");
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6">Sign Out</h2>
        <p className="text-lg mb-4">
          Are you sure you want to sign out? This action will clear your session.
        </p>
        <button
          className="px-2 py-1 bg-gray-800 text-white rounded-lg"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOutPage;
