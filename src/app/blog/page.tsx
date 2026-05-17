import Blog from '@/src/legacy-pages/about/blog'
import { getBlogData } from '@/src/lib/cms';

export default async function BlogPage() {

  const blogData = await getBlogData();

  return (
    <Blog
      blogData={blogData}
    />
  );
}