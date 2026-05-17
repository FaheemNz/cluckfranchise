import Halal from '@/src/legacy-pages/about/halal'
import { getCMSData } from '@/src/lib/cms';

export default async function Page() {

  const cmsData = await getCMSData();

  return (
    <Halal
      cmsData={cmsData.halal}
    />
  );
}