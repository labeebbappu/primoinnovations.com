/*
    consept:

    a big heading "Meet our expertise to kickstart your success."
    a college design cards for listing items below

    1) Data Modeling - Optimize your data structure
    2) Cloud Computing - Scalable, secure cloud solutions
    3) Reverse Engineering - Pioneering the reverse path
    4) Problem Solving - Solutions to complex challenges
    5) Minimal - Less input solutions
    6) Complex - Sensitive Data Handling
    7) Geo programing - Location-based solutions
    8) Innovative - Tailored cutting-edge solutions

*/

import {
  AcademicCapIcon,
  CloudIcon,
  ArrowPathIcon,
  PuzzlePieceIcon,
  MinusCircleIcon,
  ShieldExclamationIcon,
  MapPinIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

interface ExpertiseCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ title, description, icon }) => {
  return (
    <li className=" p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-primary-600 dark:text-primary-400">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p >{description}</p>
    </li>
  );
};

const ExpertiseCollage: React.FC = () => {
  const expertiseItems = [
    {
      title: "Data Modeling",
      description: "Optimize your data structure for efficient data management",
      icon: <AcademicCapIcon className="w-8 h-8" />,
    },
    {
      title: "Cloud Computing",
      description: "Scalable, secure cloud solutions for your business",
      icon: <CloudIcon className="w-8 h-8" />,
    },
    {
      title: "Reverse Engineering",
      description: "Pioneering the reverse path to your business",
      icon: <ArrowPathIcon className="w-8 h-8" />,
    },
    {
      title: "Problem Solving",
      description: "Solutions to complex challenges with our expertise",
      icon: <PuzzlePieceIcon className="w-8 h-8" />,
    },
    {
      title: "Minimal Interation",
      description: "Less input solutions for efficient operations",
      icon: <MinusCircleIcon className="w-8 h-8" />,
    },
    {
      title: "Complex Data",
      description: "Sensitive Data Handling with our expertise",
      icon: <ShieldExclamationIcon className="w-8 h-8" />,
    },
    {
      title: "Geo Programming",
      description: "Location-based solutions for real-time operations insights",
      icon: <MapPinIcon className="w-8 h-8" />,
    },
    {
      title: "Innovative",
      description: "Tailored cutting-edge solutions for your business",
      icon: <LightBulbIcon className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-16 min-h-screen" id="expertise">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Proficient Tech Services for Perfect Resolutions.
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {expertiseItems.map((item, index) => (
            <ExpertiseCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              delay={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpertiseCollage;
