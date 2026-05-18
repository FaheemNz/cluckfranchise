import type { Metadata } from "next";
import Contact from "@/src/legacy-pages/contactUs";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.contactUs?.seo);
}

export default function Page() {
  return <Contact />;
}