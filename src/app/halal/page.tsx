import type { Metadata } from "next";
import Halal from "@/src/legacy-pages/about/halal";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.halal?.seo);
}

export default function Page() {
  return <Halal />;
}