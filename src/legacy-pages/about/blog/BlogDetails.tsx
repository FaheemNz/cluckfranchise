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
          className={`relative flex items-end overflow-hidden ${
            blogPost.cover_image
              ? "bg-cover bg-center bg-no-repeat"
              : "bg-[#F15B40]"
          }`}
          style={{
            backgroundImage: blogPost.cover_image
              ? `url('${processImageUrl(blogPost.cover_image)}')`
              : undefined,
            minHeight: "52vh",
          }}
        >

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55" />

          {/* SOFT GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />

          {/* PATTERN OVERLAY */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: "url('/assets/boximg.avif')",
              backgroundSize: "180px"
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10 w-full">

            <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-10 sm:pb-12">

              <div className="mb-6">

                <Link
                  prefetch={false}
                  href="/blog"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-all duration-300 hover:translate-x-[-3px]"
                >
                  <span className="text-lg leading-none">←</span>
                  Back to Blog
                </Link>

              </div>

              <div className="mb-4">

                <span className="inline-flex items-center rounded-full bg-white/12 border border-white/20 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-white">
                  Cluck Clucks Blog
                </span>

              </div>

              <h1
                className="text-white text-[36px] sm:text-[50px] lg:text-[64px] font-black leading-[1.02] tracking-[-0.045em] max-w-4xl"
                style={{
                  fontFamily:
                    '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
                  textShadow: "0 8px 26px rgba(0,0,0,0.45)",
                }}
              >
                {blogPost.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-white/90 text-sm sm:text-base">

                <span className="font-semibold">
                  Cluck Clucks Editorial
                </span>

                <span className="w-1.5 h-1.5 bg-[#F3C317] rounded-full" />

                <span>
                  {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>

              </div>

            </div>

          </div>

        </section>

      )}

      {/* MAIN CONTENT */}
      <section className="relative bg-[#fffaf7] min-h-screen">

        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

          {!blogPost ? (

            <div className="bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.06)] border border-[#f3e1d7] px-6 py-16 text-center">

              <h2 className="text-[#F4431C] text-2xl font-black mb-3">
                Post Not Found
              </h2>

              <p className="text-[#6f6f6f] text-base">
                The article you are looking for does not exist.
              </p>

            </div>

          ) : (

            <article className="bg-white rounded-[22px] shadow-[0_8px_30px_rgba(0,0,0,0.055)] border border-[#f3e1d7] overflow-hidden">

              {/* ARTICLE BODY */}
              <div className="px-5 sm:px-8 lg:px-12 py-7 sm:py-9 lg:py-11">

                {blogPost.content ? (

                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: blogPost.content
                    }}
                  />

                ) : (

                  <p className="text-[#6f6f6f] text-base">
                    No content available.
                  </p>

                )}

              </div>

            </article>

          )}

        </div>

      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `

            .blog-content {
              color: #292929;
              font-size: 18px;
              line-height: 1.72;
              font-weight: 400;
              letter-spacing: -0.003em;
              word-break: break-word;
              overflow-wrap: break-word;
            }

            .blog-content *,
            .blog-content *::before,
            .blog-content *::after {
              box-sizing: border-box;
            }

            .blog-content > *:first-child {
              margin-top: 0 !important;
            }

            .blog-content > *:last-child {
              margin-bottom: 0 !important;
            }

            .blog-content p {
              margin: 0 0 1.15em;
              color: #292929;
              font-size: 18px;
              line-height: 1.72;
            }

            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4,
            .blog-content h5,
            .blog-content h6 {
              color: #191919;
              font-weight: 900;
              line-height: 1.16;
              letter-spacing: -0.035em;
              margin: 1.55em 0 0.55em;
            }

            .blog-content h1 {
              font-size: 38px;
            }

            .blog-content h2 {
              font-size: 32px;
            }

            .blog-content h3 {
              font-size: 26px;
            }

            .blog-content h4 {
              font-size: 22px;
            }

            .blog-content h5 {
              font-size: 19px;
            }

            .blog-content h6 {
              font-size: 17px;
              text-transform: uppercase;
              letter-spacing: 0.04em;
            }

            .blog-content strong,
            .blog-content b {
              font-weight: 800;
              color: #151515;
            }

            .blog-content em,
            .blog-content i {
              font-style: italic;
            }

            .blog-content u {
              text-underline-offset: 3px;
            }

            .blog-content small {
              font-size: 0.86em;
              color: #666;
            }

            .blog-content mark {
              background: #fff1a8;
              color: #191919;
              padding: 0.08em 0.22em;
              border-radius: 4px;
            }

            .blog-content a {
              color: #F4431C;
              font-weight: 700;
              text-decoration: underline;
              text-decoration-thickness: 1.5px;
              text-underline-offset: 3px;
              transition: color 0.2s ease;
            }

            .blog-content a:hover {
              color: #d93613;
            }

            .blog-content ul,
            .blog-content ol {
              margin: 0 0 1.25em 1.35em;
              padding: 0;
            }

            .blog-content ul {
              list-style-type: disc;
            }

            .blog-content ol {
              list-style-type: decimal;
            }

            .blog-content ul ul {
              list-style-type: circle;
              margin-top: 0.35em;
              margin-bottom: 0.35em;
            }

            .blog-content ul ul ul {
              list-style-type: square;
            }

            .blog-content ol ol {
              list-style-type: lower-alpha;
              margin-top: 0.35em;
              margin-bottom: 0.35em;
            }

            .blog-content ol ol ol {
              list-style-type: lower-roman;
            }

            .blog-content li {
              margin: 0.38em 0;
              padding-left: 0.18em;
              line-height: 1.68;
            }

            .blog-content li::marker {
              color: #F4431C;
              font-weight: 800;
            }

            .blog-content li p {
              margin: 0.35em 0;
            }

            .blog-content blockquote {
              margin: 1.55em 0;
              padding: 0.35em 0 0.35em 1.1em;
              border-left: 4px solid #F4431C;
              color: #414141;
              font-size: 20px;
              line-height: 1.6;
              font-weight: 500;
              background: transparent;
            }

            .blog-content blockquote p {
              font-size: inherit;
              line-height: inherit;
              color: inherit;
              margin-bottom: 0.75em;
            }

            .blog-content blockquote p:last-child {
              margin-bottom: 0;
            }

            .blog-content img {
              display: block;
              max-width: 100%;
              width: auto;
              height: auto;
              border-radius: 18px;
              margin: 1.6em auto;
              box-shadow: 0 8px 26px rgba(0, 0, 0, 0.08);
            }

            .blog-content p img {
              margin-top: 1.4em;
              margin-bottom: 1.4em;
            }

            .blog-content figure {
              margin: 1.7em 0;
            }

            .blog-content figure img {
              margin: 0 auto;
            }

            .blog-content figcaption {
              margin-top: 0.7em;
              text-align: center;
              color: #777;
              font-size: 14px;
              line-height: 1.45;
            }

            .blog-content hr {
              border: 0;
              height: 1px;
              background: #ece1dc;
              margin: 2em 0;
            }

            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.6em 0;
              font-size: 15px;
              line-height: 1.5;
              border: 1px solid #efe0d8;
              background: #fff;
            }

            .blog-content thead {
              background: #fff1e8;
            }

            .blog-content tbody tr:nth-child(even) {
              background: #fffaf7;
            }

            .blog-content th,
            .blog-content td {
              border: 1px solid #efe0d8;
              padding: 12px 14px;
              text-align: left;
              vertical-align: top;
            }

            .blog-content th {
              color: #191919;
              font-weight: 800;
              background: #fff1e8;
            }

            .blog-content td {
              color: #333;
            }

            .blog-content caption {
              caption-side: bottom;
              text-align: center;
              color: #777;
              font-size: 14px;
              line-height: 1.45;
              padding-top: 0.75em;
            }

            .blog-content code {
              background: #fff1e8;
              color: #d93613;
              padding: 0.15em 0.38em;
              border-radius: 6px;
              font-size: 0.88em;
              font-weight: 700;
              white-space: break-spaces;
            }

            .blog-content pre {
              background: #191919;
              color: #fff;
              padding: 18px;
              border-radius: 16px;
              overflow-x: auto;
              margin: 1.5em 0;
              font-size: 14px;
              line-height: 1.6;
            }

            .blog-content pre code {
              background: transparent;
              color: inherit;
              padding: 0;
              border-radius: 0;
              font-size: inherit;
              font-weight: inherit;
              white-space: pre;
            }

            .blog-content iframe,
            .blog-content video,
            .blog-content embed,
            .blog-content object {
              display: block;
              width: 100%;
              max-width: 100%;
              border-radius: 18px;
              margin: 1.6em 0;
            }

            .blog-content iframe {
              aspect-ratio: 16 / 9;
              height: auto;
              min-height: 320px;
              border: 0;
            }

            .blog-content video {
              height: auto;
            }

            .blog-content audio {
              display: block;
              width: 100%;
              margin: 1.4em 0;
            }

            .blog-content div {
              max-width: 100%;
            }

            .blog-content span {
              max-width: 100%;
            }

            .blog-content sup,
            .blog-content sub {
              font-size: 0.72em;
              line-height: 0;
            }

            .blog-content dl {
              margin: 1.25em 0;
            }

            .blog-content dt {
              font-weight: 800;
              color: #191919;
              margin-top: 0.9em;
            }

            .blog-content dd {
              margin: 0.3em 0 0.8em 1.25em;
              color: #444;
            }

            .blog-content .table-wrapper {
              width: 100%;
              overflow-x: auto;
            }

            @media (max-width: 768px) {
              .blog-content {
                font-size: 17px;
                line-height: 1.68;
              }

              .blog-content p {
                font-size: 17px;
                line-height: 1.68;
              }

              .blog-content h1 {
                font-size: 31px;
              }

              .blog-content h2 {
                font-size: 27px;
              }

              .blog-content h3 {
                font-size: 23px;
              }

              .blog-content h4 {
                font-size: 20px;
              }

              .blog-content blockquote {
                font-size: 18px;
                padding-left: 0.9em;
              }

              .blog-content table {
                display: block;
                width: 100%;
                overflow-x: auto;
                white-space: nowrap;
                font-size: 14px;
              }

              .blog-content th,
              .blog-content td {
                padding: 10px 12px;
              }

              .blog-content iframe {
                min-height: 220px;
              }
            }

          `
        }}
      />

    </>
  );
};

export default BlogDetails;