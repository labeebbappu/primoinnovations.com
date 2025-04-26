

import React from 'react';

const FootBar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 w-full text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center">
          {/* Gradient PRIMO text */}
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            PRIMO
          </h2>
          
          {/* Made with love */}
          <p className="text-gray-300 mb-2">
            Made with <span className="text-red-500">❤</span> by Primo Innovations
          </p>
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Primo Innovations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FootBar;
