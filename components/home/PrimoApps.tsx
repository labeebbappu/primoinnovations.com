import React from 'react';
import {  CheckIcon, XMarkIcon  } from '@heroicons/react/24/solid';

const PrimoApps = () => {
  const plans = [
    {
      title: 'Basic',
      price: '$600',
      period: 'month',
      capacity: '10 spreadsheets',
      features: [
        'Web app development',
        'Infrastructure management',
        'Dedicated support engineer'
      ],
      notIncluded: [
        'Customization',
        'Performance optimization'
      ]
    },
    {
      title: 'Standard',
      price: '$1200',
      period: 'month',
      capacity: '20 spreadsheets',
      features: [
        'Web app development',
        'Infrastructure management',
        'Dedicated support engineer'
      ],
      notIncluded: [
        'Customization',
        'Performance optimization'
      ]
    },
    {
      title: 'Enterprise',
      price: 'Contact us',
      period: '',
      capacity: 'Custom solutions',
      features: [
        'Web app development',
        'Infrastructure management',
        'Dedicated support engineer',
        'Customization',
        'Performance optimization'
      ],
      notIncluded: []
    }
  ];

  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Primo Apps</h2>
          <p className="text-xl text-gray-600">
            Convert your spreadsheet workflow into a web app
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105 ${
                index === 1 ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500">/{plan.period}</span>}
                <p className="text-gray-600 mt-2">{plan.capacity}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <XMarkIcon className="w-5 h-5 text-red-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={`https://wa.me/97451715999?text=I%20want%20to%20know%20more%20about%20your%20${plan.title}%20plan`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-semibold text-center block ${
                  index === 2 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : index === 1 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-100 text-blue-600'
                }`}
              >
                {index === 2 ? 'Contact Us' : 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrimoApps;
