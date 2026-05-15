import "./globals.css";

import type { Metadata } from "next";
import Navigation from "@/src/components/Navigation";
import Footer from "@/src/components/Footer";
import ScrollToTopVercel from "@/src/components/ScrollToTopVercel";
import AppInitializer from "@/src/components/AppInitializer";
import PromotionalBannerWrapper from "@/src/components/common/PromotionalBanner";

export const metadata: Metadata = {
  title: "Cluck Clucks",
  description: "Chicken and Waffles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>

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

      </body>

    </html>
  );
}