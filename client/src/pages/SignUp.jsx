import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

    const apiUrl = "/auth/signup"; //TODO: create file to store urls
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 shadow-md rounded-md"
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
        <div className="flex items-center justify-between">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
