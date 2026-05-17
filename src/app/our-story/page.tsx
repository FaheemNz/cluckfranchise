import OurStory from '@/src/legacy-pages/about/our-story'
import { getCMSData } from '@/src/lib/cms';

export default async function Page() {

  const cmsData = await getCMSData();

  return (
    <OurStory
      cmsData={cmsData.about}
    />
  );
}