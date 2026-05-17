import BlogDetails from '@/src/legacy-pages/about/blog/BlogDetails';
import { getBlogPost } from '@/src/lib/cms';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailsPage({
  params
}: PageProps) {

  const { id } = await params;

  const blogPost = await getBlogPost(id);

  return (
    <BlogDetails
      blogPost={blogPost}
    />
  );
}