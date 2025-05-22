import React from "react";
import TopMenu from "../TopMenu";
import Hero from "./Hero";
import ServicesSection from "./ServicesSection";
import FootBar from "../FootBar";
import PrimoApps from "./PrimoApps";
import ExpertiseCollage from "./ExpertiseCollage";

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
