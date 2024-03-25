import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firabse";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultsFromGoogle);
      const res = await apiService.api(
        JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
        }),
        "/auth/google",
        "POST"
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/backlog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      className="px-2 py-1 bg-white text-gray-800 border-gray-800 rounded-lg"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      {handleGoogleClick}
      Continue With Google
    </Button>
  );
}
