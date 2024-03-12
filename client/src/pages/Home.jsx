import React from "react";
import homeBg from "../assets/images/home-bg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user.user);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${homeBg})`,
      }}
    >
      <h1 className="text-5xl font-bold mb-4 text-gray-800">TaskHub</h1>
      <p className="text-xl mb-8 text-gray-600">
        The best way to manage your tasks and projects.
      </p>
      <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded">
        {currentUser ? (
          <Link to="/projects">Get Started</Link>
        ) : (
          <Link to="/signup">Get Started</Link>
        )}
      </button>
    </div>
  );
};

export default Home;
