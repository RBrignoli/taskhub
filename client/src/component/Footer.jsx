
import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <p className="text-center">
            &copy; 2024 TaskHub Project Manager App. All rights reserved. | Developed by Ramon Brignoli
            <br />
            Connect with me on{' '}
            <a
              href="https://www.linkedin.com/in/ramon-brignoli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    );
  };

export default Footer;