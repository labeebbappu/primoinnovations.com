import React from "react";

import TopMenu from "@/app/intro/TopMenu";
import FootBar from "@/app/intro/FootBar";
import Hero from "./Hero";

const ContactPage = async () => {
  return (
    <div className="min-h-screen">
      <TopMenu />

      <Hero
        title="Here we write sooner"
        subtitle="Let's have knowledge shared"
      />
      
      <FootBar />
    </div>
  );
};

export default ContactPage;
