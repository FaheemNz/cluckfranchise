import Home from '@/src/legacy-pages/home';
import { getCMSData } from '@/src/lib/cms';

export default async function Page() {
  const data = await getCMSData();
  return <Home cmsData={data} />;
}