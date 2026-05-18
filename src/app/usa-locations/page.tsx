import UnitedStates from '@/src/legacy-pages/locations/united-states'
import { getCMSData } from '@/src/lib/cms'

export default async function Page() {
  const cmsData = await getCMSData()

  return <UnitedStates cmsData={cmsData} />
}