import React from "react";
import TopMenu from "@/components/home/TopMenu";
import FootBar from "@/components/home/FootBar";

import {  PuzzlePieceIcon } from "@heroicons/react/24/solid";

const AboutPage = async () => {
  return (
    <div className="min-h-screen">
      <TopMenu />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About PRIMO</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            We provide easy tech solutions for companies at affordable rates.
            Our methods are straight, comfortable, and established to ensure
            evolution and acceleration with innovation.
          </p>
        </div>
      </div>

      {/* Consultation Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Free Consultation</h2>
            <p className="text-lg mb-6">
              You will get the perfect resolutions with our proficient services.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Us Today
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gray-200">
              {/* Placeholder for "Smiling Arab Man" image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <PuzzlePieceIcon className="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
 

      <FootBar />
    </div>
  );
};

export default AboutPage;
