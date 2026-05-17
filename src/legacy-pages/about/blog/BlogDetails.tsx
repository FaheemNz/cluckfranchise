import React from "react";
import Link from "next/link";
import { processImageUrl } from "../../../utils/imageUtils";

interface BlogDetailsProps {
  blogPost: any;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  blogPost
}) => {

  return (
    <>

      {/* HERO SECTION */}
      {blogPost && (

        <section
          className={`relative flex items-center justify-center overflow-hidden ${
            blogPost.cover_image
              ? "bg-cover bg-center bg-no-repeat"
              : "bg-[#F15B40]"
          }`}
          style={{
            backgroundImage: blogPost.cover_image
              ? `url('${processImageUrl(blogPost.cover_image)}')`
              : undefined,
            minHeight: "65vh",
          }}
        >

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

          {/* PATTERN OVERLAY */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "url('/assets/boximg.avif')",
              backgroundSize: "180px"
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">

            <div className="inline-flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 rounded-full mb-8">

              <span className="text-white uppercase tracking-[3px] text-sm font-bold">
                Cluck Clucks Blog
              </span>

            </div>

            <h1
              className="text-white text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-[1.05]"
              style={{
                fontFamily:
                  '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
                textShadow: "0 6px 24px rgba(0,0,0,0.45)",
                letterSpacing: "-0.03em",
              }}
            >
              {blogPost.title}
            </h1>

            <div className="mt-8 flex items-center justify-center gap-4 text-white/90 text-base sm:text-lg">

              <span className="w-2 h-2 bg-[#F3C317] rounded-full" />

              <span className="font-medium">
                {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>

            </div>

          </div>

        </section>

      )}

      {/* MAIN CONTENT */}
      <section className="relative bg-[#fffaf7] min-h-screen overflow-hidden">

        {/* BACKGROUND PATTERN */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">

          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: "url('/assets/boximg.avif')",
              backgroundSize: "180px"
            }}
          />

        </div>

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 py-12 lg:py-20">

          {/* BACK BUTTON */}
          <div className="mb-8">

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#F4431C] font-bold text-lg transition-all duration-300 hover:translate-x-[-4px]"
            >
              <span className="text-2xl">←</span>
              Back to Blog
            </Link>

          </div>

          {!blogPost ? (

            <div className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#f3e1d7] px-8 py-24 text-center">

              <h2 className="text-[#F4431C] text-3xl font-black mb-4">
                Post Not Found
              </h2>

              <p className="text-[#8B5C2A] text-lg">
                The article you are looking for does not exist.
              </p>

            </div>

          ) : (

            <article className="bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden border border-[#f3e1d7]">

              {/* FEATURED IMAGE */}
              {blogPost.cover_image && (

                <div className="w-full h-[260px] sm:h-[400px] lg:h-[500px] overflow-hidden">

                  <img
                    src={processImageUrl(blogPost.cover_image)}
                    alt={blogPost.title}
                    className="w-full h-full object-cover"
                  />

                </div>

              )}

              {/* CONTENT */}
              <div className="px-6 sm:px-10 lg:px-16 py-10 lg:py-14">

                {/* CATEGORY BADGE */}
                <div className="flex justify-center mb-8">

                  <div className="bg-[#fff1e8] text-[#F4431C] px-5 py-2 rounded-full text-sm font-black uppercase tracking-[2px] shadow-sm">
                    Cluck Clucks Editorial
                  </div>

                </div>

                {/* TITLE */}
                <h2 className="text-[#F4431C] font-black text-3xl sm:text-4xl lg:text-5xl text-center leading-[1.1] tracking-[-0.03em]">
                  {blogPost.title}
                </h2>

                {/* DATE */}
                <div className="flex items-center justify-center gap-3 mt-6 mb-12 text-[#8B5C2A]">

                  <span className="w-2 h-2 bg-[#F4431C] rounded-full" />

                  <span className="font-semibold text-base sm:text-lg">
                    {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>

                </div>

                {/* ARTICLE CONTENT */}
                <div className="max-w-none">

                  {blogPost.content ? (

                    <div
                      className="prose prose-lg max-w-none blog-content"
                      dangerouslySetInnerHTML={{
                        __html: blogPost.content
                      }}
                    />

                  ) : (

                    <p className="text-[#8B5C2A] text-lg">
                      No content available.
                    </p>

                  )}

                </div>

              </div>

            </article>

          )}

        </div>

      </section>

    </>
  );
};

export default BlogDetails;