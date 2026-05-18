import Menu from '@/src/legacy-pages/menu';
import { getMenuData } from '@/src/lib/cms';

export default async function Page() {
  const menuData = await getMenuData();

  return <Menu menuData={menuData} />;
}