import type { Metadata } from "next";
import Gallery from "@/src/legacy-pages/about/gallery";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.gallery?.seo);
}

export default function Page() {
  return <Gallery />;
}