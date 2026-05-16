import Catering from '@/src/legacy-pages/catering';
import { getCMSData } from '@/src/lib/api';

export default async function Page() {
  const data = await getCMSData();
  return <Catering cmsData={data} />;
}