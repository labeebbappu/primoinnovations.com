import React from 'react';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">{subtitle}</p>
            <a 
              href="/intro/contact" 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Free Consultation
            </a>
          </div>
          <div className="relative w-full md:w-1/2 h-80">
            <Image
              src="/images/home-smiling-arab-man.png"
              alt="Smiling Arab Man"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;