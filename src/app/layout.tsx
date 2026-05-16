import "./globals.css";

import type { Metadata } from "next";
import Navigation from "@/src/components/Navigation";
import Footer from "@/src/components/Footer";
import ScrollToTopVercel from "@/src/components/ScrollToTopVercel";
import AppInitializer from "@/src/components/AppInitializer";
import PromotionalBannerWrapper from "@/src/components/common/PromotionalBanner";
import { getCMSData } from "@/src/lib/cms";
import { CMSProvider } from "@/src/context/CMSContext";

export const metadata: Metadata = {
  title: "Cluck Clucks",
  description: "Chicken and Waffles",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cmsData = await getCMSData();

  return (

    <html lang="en">

      <body>
        <CMSProvider cmsData={cmsData}>

          <AppInitializer />

          {/* Optional home-page-only banner wrapper */}
          <PromotionalBannerWrapper />

          <ScrollToTopVercel />

          <div className="flex flex-col min-h-screen">

            <Navigation />

            <main className="flex-grow">
              {children}
            </main>

            <Footer />

          </div>
        </CMSProvider>
      </body>

    </html>
  );
}