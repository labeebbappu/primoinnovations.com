import React from "react";
import Image from "next/image";

interface TeamMemberCardProps {
  profileImageSrc: string;
  fullName: string;
  designation: string;
  shortBio: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ profileImageSrc, fullName, designation, shortBio }) => {
  return (
    <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 max-w-xs min-w-xs border border-gray-100">
      <div className="relative w-32 h-32 overflow-hidden rounded-full mb-4 border-2 border-gray-100">
        <Image src={profileImageSrc} alt={fullName} fill className="object-cover" priority />
      </div>


      <div className="text-center w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{fullName}</h2>
        <p className="text-sm font-medium text-gray-500 mb-3">{designation}</p>
        <div className="mt-2 px-2 mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">{shortBio}</p>
        </div>
        
      </div>
    </div>
  );
};

const TeamMemberSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">The Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Meet the founders behind PRIMO Innovations</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-10 max-w-5xl mx-auto">
          <TeamMemberCard
            profileImageSrc="/images/smith.png"
            fullName="Fawas"
            designation="Co-founder"
            shortBio=""
            
          />

          <TeamMemberCard
            profileImageSrc="/images/labeeb3.jpg"
            fullName="Labeeb"
            designation="Co-founder"
            shortBio="Solution Architect & Full-Stack Developer with 10+ years' experience delivering innovative web, mobile, cloud, and embedded solutions."
            
          />
        </div>
      </div>
    </section>
  );
};

export default TeamMemberSection;
