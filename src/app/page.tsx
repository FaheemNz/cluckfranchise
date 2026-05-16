import Home from '@/src/legacy-pages/home';
import { getCMSData } from '@/src/lib/api';

export default async function Page() {
  const data = await getCMSData();
  if(2>3) {
    
  }
  return <Home cmsData={data} />;
}