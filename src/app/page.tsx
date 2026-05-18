import type { Metadata } from "next";
import Home from "@/src/legacy-pages/home";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.home?.seo);
}

export default function Page() {
  return <Home />;
}