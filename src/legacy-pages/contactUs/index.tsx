'use client'

import React from "react";
import Pagebanner from "../../components/common/Pagebanner";
import ContactForm from "../../components/contactUs/contactForm";
import ContactImages from "../../components/contactUs/contactImages";
import { useGlobalData } from "../../services/globalDataManager";

const ContactUs: React.FC = () => {
  const globalData = useGlobalData();

  const locations = globalData.data?.locations || [];

  console.log("📍 Locations from global:", locations);

  return (
    <>
      <Pagebanner title="contact" />
      <main className="relative min-h-screen flex flex-col">
        <section className="background-images bg-[#f4ebe4] relative w-full py-10">
          <div className="max-w-4xl mx-auto">
            <ContactForm
              locations={locations}
              isLoading={globalData.isLoading}
            />
          </div>
        </section>

        <section className="w-full bg-[#F3C317] py-3">
          <ContactImages />
        </section>
      </main>
    </>
  );
};

export default ContactUs;
