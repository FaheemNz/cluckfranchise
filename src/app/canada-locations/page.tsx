import type { Metadata } from "next";
import Canada from "@/src/legacy-pages/locations/canada";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.["canada-locations"]?.seo);
}

export default function Page() {
  return <Canada />;
}