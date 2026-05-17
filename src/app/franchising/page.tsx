import Franchising from '@/src/legacy-pages/franchising';
import { getCMSData } from '@/src/lib/cms';

export default async function Page() {

  const cmsData = await getCMSData();

  return (
    <Franchising
      cmsData={cmsData.franchising}
    />
  );
}