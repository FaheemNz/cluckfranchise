import type { Metadata } from "next";
import OurStory from "@/src/legacy-pages/about/our-story";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.about?.seo);
}

export default function Page() {
  return <OurStory />;
}