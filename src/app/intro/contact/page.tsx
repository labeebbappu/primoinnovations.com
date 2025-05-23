import React from "react";

import TopMenu from "@/app/intro/TopMenu";
import FootBar from "@/app/intro/FootBar";
import Hero from "./Hero";

const ContactPage = async () => {
  return (
    <div className="min-h-screen">
      <TopMenu />

      <Hero
        title="We are a whatsapp message away."
        subtitle="ensuring seamless, direct, and friendly interaction. We believe in straightforward, personalized communication tailored to your unique needs."
      />
      
      <FootBar />
    </div>
  );
};

export default ContactPage;
