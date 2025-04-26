import React from "react";
import TopMenu from "@/components/home/TopMenu";
import Hero from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import FootBar from "@/components/home/FootBar";
import PrimoApps from "@/components/home/PrimoApps";
import ExpertiseCollage from "@/components/home/ExpertiseCollage";

const HomePage = async () => {
  return (
    <div className="min-h-screen">
      <TopMenu />
      <Hero 
        title="We provide easy tech solutions for companies at affordable rates."
        subtitle="Our methods are straight, comfortable, and established to ensure evolution and acceleration with innovation."
      />
      <ServicesSection />
      <PrimoApps />
      <ExpertiseCollage />
      <FootBar />
      
    </div>
  );
};

export default HomePage;
