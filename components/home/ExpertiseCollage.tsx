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
    <div className=" p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="mr-4 text-primary-600 dark:text-primary-400">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="">{description}</p>
    </div>
  );
};

const ExpertiseCollage: React.FC = () => {
  const expertiseItems = [
    {
      title: "Data Modeling",
      description: "Optimize your data structure",
      icon: <AcademicCapIcon className="w-8 h-8" />,
    },
    {
      title: "Cloud Computing",
      description: "Scalable, secure cloud solutions",
      icon: <CloudIcon className="w-8 h-8" />,
    },
    {
      title: "Reverse Engineering",
      description: "Pioneering the reverse path",
      icon: <ArrowPathIcon className="w-8 h-8" />,
    },
    {
      title: "Problem Solving",
      description: "Solutions to complex challenges",
      icon: <PuzzlePieceIcon className="w-8 h-8" />,
    },
    {
      title: "Minimal",
      description: "Less input solutions",
      icon: <MinusCircleIcon className="w-8 h-8" />,
    },
    {
      title: "Complex",
      description: "Sensitive Data Handling",
      icon: <ShieldExclamationIcon className="w-8 h-8" />,
    },
    {
      title: "Geo Programming",
      description: "Location-based solutions",
      icon: <MapPinIcon className="w-8 h-8" />,
    },
    {
      title: "Innovative",
      description: "Tailored cutting-edge solutions",
      icon: <LightBulbIcon className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-16 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Meet our expertise to kickstart your success.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {expertiseItems.map((item, index) => (
            <ExpertiseCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseCollage;
