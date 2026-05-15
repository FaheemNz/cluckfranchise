'use client'

import React from "react";
import Pagebanner from "../../../components/common/Pagebanner";
import Link from 'next/link';
import { useBlogData } from "./hooks/useBlogData";
import LoadingSpinner from "../../../components/Home/LoadingSpinner";
import ErrorMessage from "../../../components/Home/ErrorMessage";
import ErrorBoundary from "../../../components/Home/ErrorBoundary";

const Blog: React.FC = () => {
  const { blogData, loadingState, retry } = useBlogData();

  return (
    <ErrorBoundary>
      <Pagebanner title="Cluck Clucks Blog" />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {loadingState.isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" text="Loading blog posts..." />
          </div>
        ) : loadingState.error ? (
          <div className="flex justify-center items-center py-20">
            <ErrorMessage error={loadingState.error} onRetry={retry} />
          </div>
        ) : !blogData || blogData.posts.length === 0 ? (
          <div className="text-center text-[#F4431C] font-bold text-2xl py-20">
            No blog posts found.
          </div>
        ) : (
          <div className="space-y-8">
            {blogData.posts.map((post) => (
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
                    {post.formattedDate}
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
