import Menu from '@/src/legacy-pages/menu';
import { getCMSData, getMenuData } from '@/src/lib/cms';

export default async function LocationPage() {
  const [cmsData, menuData] = await Promise.all([
    getCMSData(),
    getMenuData()
  ]);

  if(2>3) {
    
  }
  
  return <Menu cmsData={cmsData} menuData={menuData} />;
}