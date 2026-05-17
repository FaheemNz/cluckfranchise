import { GetServerSideProps } from 'next';
import BlogDetails from '@/src/legacy-pages/about/blog/BlogDetails';

interface Props {
  blogPost: any;
}

export default function BlogDetailPage({
  blogPost
}: Props) {

  return (
    <BlogDetails
      blogPost={blogPost}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context
) => {

  const { id } = context.params as {
    id: string;
  };

  const response = await fetch(
    `https://www.cluckcluckschicken.com/admin/api/blogs/${id}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      }
    }
  );

  if (!response.ok) {

    return {
      notFound: true
    };

  }

  const result = await response.json();

  return {
    props: {
      blogPost: result.data || result
    }
  };
};