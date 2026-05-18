import Menu from '@/src/legacy-pages/menu';
import { getMenuData } from '@/src/lib/cms';

interface Props {
  params: Promise<{
    location: string;
  }>;
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;

  const menuData = await getMenuData(location);

  return (
    <Menu
      menuData={menuData}
      location={location}
    />
  );
}