'use client';

import React, { useState } from "react";
import Pagebanner from "../../../components/common/Pagebanner";
import Link from "next/link";
import ErrorBoundary from "../../../components/Home/ErrorBoundary";

interface BlogProps {
  blogData: any;
}

const Blog: React.FC<BlogProps> = ({ blogData }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const posts = blogData?.data?.data || [];

  return (
    <ErrorBoundary>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#F15B40] border-t-transparent rounded-full animate-spin" />

            <p className="text-[#894207] font-black uppercase tracking-wide text-sm">
              Loading article...
            </p>
          </div>
        </div>
      )}

      <Pagebanner title="Cluck Clucks Blog" />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {!posts || posts.length === 0 ? (
          <div className="text-center text-[#F4431C] font-bold text-2xl py-20">
            No blog posts found.
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <Link
                prefetch={false}
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={() => setIsNavigating(true)}
                className="block cursor-pointer"
              >
                <div className="text-center">
                  <h2 className="tracking-wide text-[#F4431C] font-bold text-2xl sm:text-3xl md:text-4xl uppercase hover:underline font-[MDNichrome-Black]">
                    {post.title}
                  </h2>

                  <p className="text-[#8B5C2A] font-medium text-base sm:text-lg mt-2">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
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