import type { Metadata } from "next";
import Catering from "@/src/legacy-pages/catering";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.catering?.seo);
}

export default function Page() {
  return <Catering />;
}