import ItemPage from '@/src/legacy-pages/item/index';
import { getCMSData, getMenuData } from '@/src/lib/cms';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {

  const { slug } = await params;

  const [cmsData, menuData] = await Promise.all([
    getCMSData(),
    getMenuData(),
  ]);

  return (
    <ItemPage
      cmsData={cmsData}
      menuData={menuData}
      slug={slug}
    />
  );
}