import type { Metadata } from "next";
import Franchising from "@/src/legacy-pages/franchising";
import { getCMSData } from "@/src/lib/cms";
import { buildPageMetadata } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getCMSData();

  return buildPageMetadata(cmsData?.franchising?.seo);
}

export default function Page() {
  return <Franchising />;
}