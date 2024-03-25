import { useState } from "react";
import { Button, TextInput, Alert } from "flowbite-react";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS } from "../services/server-urls";
import apiService from "../services/api";
import OAuth from "../component/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [Message, setMessage] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await apiService.api(
        JSON.stringify(formData),
        API_URLS.signup,
        "POST"
      );
      if (response.status === 200) {
        setMessage("Signup successfully!");
        setTimeout(() => {
          navigate('/signin');
        }, 2000);

      } else if (response.status == 409) {
        setMessage("Email already exists");
      }
      else {
        setMessage("An error occurred, try again");
      }
    } catch (error) {
      setMessage("Error during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 mx-auto">
          <Link to="/" className="font-semibold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gray-800 text-white rounded-lg">
              Task
            </span>
            Hub
          </Link>
          <p className="text-sm mt-5">This project is part of a study,</p>
          <p className="text-sm">Create your user with email and password</p>
        </div>
        <form
          className="bg-white p-8 shadow-md rounded-md flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <TextInput
              type="text"
              rightIcon={AiOutlineUser}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <TextInput
              type="text"
              rightIcon={AiOutlineMail}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <TextInput
              type={showPassword ? "text" : "password"}
              rightIcon={AiOutlineLock}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onTogglePassword={handleTogglePassword}
              required
            />
          </div>
          <Button type="submit" className="px-2 py-1 bg-gray-800 text-white rounded-lg">Sign Up</Button>
          <OAuth />
          <div className="flex gap-2 text-sm">
            <span>Already have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
            {Message && <Alert className="">{Message}</Alert>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
