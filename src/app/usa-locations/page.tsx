import type { Metadata } from "next";
import UnitedStates from "@/src/legacy-pages/locations/united-states";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.["usa-locations"]?.seo);
}

export default function Page() {
  return <UnitedStates />;
}