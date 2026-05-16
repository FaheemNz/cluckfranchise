import Home from '@/src/legacy-pages/home';
import { getCMSData } from '@/src/lib/api';

export default async function Page() {
  const data = await getCMSData();
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  return <Home cmsData={data} />;
}