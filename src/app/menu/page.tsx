import Menu from '@/src/legacy-pages/menu';
import { getCMSData, getMenuData } from '@/src/lib/cms';

export default async function Page() {
  const [cmsData, menuData] = await Promise.all([
    getCMSData(),
    getMenuData()
  ]);

  return <Menu cmsData={cmsData} menuData={menuData} />;
}