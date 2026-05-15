'use client'

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBlogPost } from "./hooks/useBlogPost";
import LoadingSpinner from "../../../components/Home/LoadingSpinner";
import ErrorMessage from "../../../components/Home/ErrorMessage";
import ErrorBoundary from "../../../components/Home/ErrorBoundary";
import { processImageUrl } from "../../../utils/imageUtils";

const BlogDetails: React.FC = () => {
  const params = useParams();
  const slug = params?.id as string;
  const { blogPost, loadingState, retry } = useBlogPost(slug || "");

  return (
    <ErrorBoundary>
      {/* Hero Banner */}
      {!loadingState.isLoading && blogPost && (
        <div
          className={`relative flex flex-col items-center justify-center w-full text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] ${
            blogPost.cover_image
              ? "bg-no-repeat bg-center bg-cover"
              : "bg-repeat bg-[length:160px_auto] bg-[#F15B40]"
          }`}
          style={{
            backgroundImage: blogPost.cover_image
              ? `url('${processImageUrl(blogPost.cover_image)}')`
              : `url('/assets/boximg.avif')`,
            backgroundColor: blogPost.cover_image ? "#F15B40" : undefined,
            minHeight: "45vh",
          }}
        >
          {/* Overlay to maintain text contrast */}
          {blogPost.cover_image && (
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          )}

          {/* Title */}
          <h1
            className="relative z-10 text-center px-[5%] py-[20px] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase"
            style={{
              fontFamily:
                '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
              textShadow: "3px 3px 0px rgba(137, 66, 6, 0.4)",
              letterSpacing: "0px",
              maxWidth: "90%",
              lineHeight: 1.2,
            }}
          >
            {blogPost.title?.toUpperCase()}
          </h1>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            href="/blog"
            className="text-[#F4431C] font-semibold hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>

        {loadingState.isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" text="Loading blog post..." />
          </div>
        ) : loadingState.error ? (
          <div className="flex justify-center items-center py-20">
            <ErrorMessage error={loadingState.error} onRetry={retry} />
          </div>
        ) : !blogPost ? (
          <div className="text-center text-[#F4431C] font-bold text-2xl py-20">
            Post not found.
          </div>
        ) : (
          <article>
            <h2 className="text-[#F4431C] font-extrabold text-2xl sm:text-3xl md:text-4xl text-center">
              {blogPost.title}
            </h2>
            <p className="text-center text-[#8B5C2A] font-medium mt-2">
              {blogPost.formattedDate}
            </p>

            <div className="mt-10 mx-auto max-w-3xl">
              {blogPost.content ? (
                <div
                  className="space-y-6 text-[#8B5C2A] leading-8 text-base sm:text-lg prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              ) : (
                <p className="text-[#8B5C2A]">No content available.</p>
              )}
            </div>
          </article>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BlogDetails;
