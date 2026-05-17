import React from "react";
import Pagebanner from "../../../components/common/Pagebanner";
import Link from 'next/link';
import ErrorBoundary from "../../../components/Home/ErrorBoundary";

interface BlogProps {
  blogData: any;
}

const Blog: React.FC<BlogProps> = ({
  blogData
}) => {

  return (
    <ErrorBoundary>
      <Pagebanner title="Cluck Clucks Blog" />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {!blogData?.data?.data || blogData.data.data.length === 0 ? (
          <div className="text-center text-[#F4431C] font-bold text-2xl py-20">
            No blog posts found.
          </div>
        ) : (
          <div className="space-y-8">
            {blogData.data.data.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block cursor-pointer"
              >
                <div className="text-center">
                  <h2 className="tracking-wide text-[#F4431C] font-bold text-2xl sm:text-3xl md:text-4xl uppercase group-hover:underline font-[MDNichrome-Black]">
                    {post.title}
                  </h2>
                  <p className="text-[#8B5C2A] font-medium text-base sm:text-lg mt-2">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Blog;
