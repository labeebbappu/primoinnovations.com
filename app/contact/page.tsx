import React from "react";
import TopMenu from "@/components/home/TopMenu";
import FootBar from "@/components/home/FootBar";
import Hero from "@/components/contact/Hero";

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
