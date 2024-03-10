
const About = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6">About This Project</h2>

        <p className="text-lg mb-4">
          Welcome to the about page of my Fullstack Web Development final
          project! This project is a significant part of my postgraduate program
          in Fullstack Web Development, showcasing the skills and knowledge Ive
          gained throughout the course.
        </p>

        <p className="text-lg mb-4">
          The technology stack used in this project is the MERN stack, which
          stands for MongoDB, Express.js, React, and Node.js. Heres a brief
          overview of each component:
        </p>

        <ul className="list-disc ml-8 text-lg mb-4">
          <li>
            <strong>MongoDB:</strong> MongoDB is utilized as the database for
            storing and managing data.
          </li>
          <li>
            <strong>Express.js:</strong> Express.js is employed to create a
            robust and scalable backend server.
          </li>
          <li>
            <strong>React:</strong> React is used for building the dynamic and
            interactive frontend of the application.
          </li>
          <li>
            <strong>Node.js:</strong> Node.js powers the server-side logic,
            enabling the backend to run using JavaScript.
          </li>
        </ul>

        <p className="text-lg mb-4">
          In addition to the core stack, this project also highlights my
          proficiency in various areas:
        </p>

        <ul className="list-disc ml-8 text-lg mb-4">
          <li>
            <strong>Cloud Computing:</strong> Leveraging cloud services for
            scalability, reliability, and performance optimization.
          </li>
          <li>
            <strong>Deployment:</strong> Efficient deployment strategies to
            ensure a seamless and secure release of the application.
          </li>
          <li>
            <strong>Git:</strong> Version control using Git, facilitating
            collaboration and maintaining a clean codebase.
          </li>
          <li>
            <strong>Docker:</strong> Containerization with Docker for easy
            deployment, isolation, and reproducibility of the development
            environment.
          </li>
        </ul>

        <p className="text-lg">
          The frontend is developed using React along with Tailwind CSS to
          provide a clean and responsive user interface. Feel free to explore
          the different features and functionalities implemented as part of this
          project.
        </p>

        <p className="text-lg mt-6">
          Thank you for taking the time to learn more about this project! If you
          have any questions or feedback, please dont hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default About;
