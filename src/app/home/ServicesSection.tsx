import React from 'react';
import {  CalculatorIcon,
CubeTransparentIcon,
AcademicCapIcon,
FunnelIcon,

 } from '@heroicons/react/24/solid';

const ServicesSection = () => {
  const services = [
    {
      icon: <CalculatorIcon className="h-6 w-6" />,
      title: 'App development',
      description: 'Unlock the power of custom app development tailored to your business. We create innovative, user-friendly solutions that drive growth and enhance customer engagement.'
    },
    {
      icon: <CubeTransparentIcon className="h-6 w-6" />,
      title: 'AI & ML apps',
      description: 'Transform your business with AI & ML apps that automate processes, enhance decision-making, and deliver personalized user experiences—driving innovation and growth effortlessly.'
    },
    {
      icon: <AcademicCapIcon className="h-6 w-6" />,
      title: 'Corporate training',
      description: 'Empower your team with tailored corporate training programs that boost skills, enhance productivity, and foster growth—driving long-term success for your business.'
    },
    {
      icon: <FunnelIcon className="h-6 w-6" />,
      title: 'Data Analytics',
      description: 'Leverage the power of data analytics to uncover insights, optimize decision-making, and drive business growth with actionable, data-driven strategies.'
    }
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 px-4 md:px-8 lg:px-16" id="services">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            You will get the{' '}
            <span className="text-blue-500">perfect <span className="text-cyan-400">resolutions</span></span> with
            <br />
            our proficient services.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                index === 0 ? 'bg-yellow-100' :
                index === 1 ? 'bg-green-100' :
                index === 2 ? 'bg-purple-100' :
                'bg-cyan-100'
              }`}>
                {/* <Image 
                  src={service.icon} 
                  alt={service.title} 
                  width={24} 
                  height={24} 
                /> */}
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              
              {/* Description */}
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;