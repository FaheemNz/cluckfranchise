import Canada from '@/src/legacy-pages/locations/canada'
import { getCMSData } from '@/src/lib/cms'

export default async function Page() {
  const cmsData = await getCMSData()

  return <Canada cmsData={cmsData} />
}