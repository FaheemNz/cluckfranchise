import Menu from '@/src/legacy-pages/menu';
import { getCMSData, getMenuData } from '@/src/lib/cms';

interface Props {
  params: Promise<{
    location: string;
  }>;
}

export default async function LocationPage({ params }: Props) {

  const { location } = await params;

  const [cmsData, menuData] = await Promise.all([
    getCMSData(),
    getMenuData(location)
  ]);

  return (
    <Menu
      cmsData={cmsData}
      menuData={menuData}
      location={location}
    />
  );
}