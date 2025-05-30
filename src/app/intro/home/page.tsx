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
        title="Leading AI App Development in Doha, Qatar - Innovative Solutions"
        subtitle="Expert AI app development services in Qatar, delivering cutting-edge solutions that drive innovation and business growth. Our proven methods ensure successful digital transformation for companies across Doha."
      />
      <ServicesSection />
      <PrimoApps />
      <ExpertiseCollage />
      <FootBar />
      
    </div>
  );
};

export default HomePage;
