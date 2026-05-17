import Link from 'next/link';
import Pagebanner from '@/src/components/common/Pagebanner';
import { processImageUrl } from '@/src/utils/imageUtils';
import { slugify } from '@/src/utils/slugify';
import ReviewForm from '@/src/components/ReviewForm';

interface ItemPageProps {
    cmsData: any;
    menuData: any;
    slug: string;
}

export default function ItemPage({
    cmsData,
    menuData,
    slug
}: ItemPageProps) {

    const menuItems =
        menuData?.sections?.menuSection?.menuItems || [];

    const allItems = menuItems.flatMap(
        (category: any) => category.items || []
    );

    const item = allItems.find(
        (i: any) => slugify(i.title) === slug
    );

    console.log('ITEM DATA:', item);

    if (!item) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-[#fffaf7]">

                <h1 className="text-3xl font-black text-[#F15B40]">
                    Item not found
                </h1>

            </div>

        );
    }

    return (

        <>

            <Pagebanner title={item.title} />

            <div className="background-images min-h-screen py-10 px-4">

                <div className="max-w-6xl mx-auto bg-white rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#f3e3d3] overflow-hidden">

                    {/* Breadcrumb */}
                    <div className="px-8 pt-8 text-sm text-[#894207]">

                        <Link
                            href="/menu"
                            className="hover:text-[#F15B40] transition-colors"
                        >
                            Menu
                        </Link>

                        <span className="mx-2">/</span>

                        <span>{item.title}</span>

                    </div>

                    {/* MAIN SECTION */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-14">

                        {/* IMAGE */}
                        <div className="flex items-center justify-center">

                            <div className="relative w-full bg-[#fff7f2] rounded-[28px] p-8 border border-[#f4dfcf] overflow-hidden">

                                <div
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: "url('/assets/boximg.avif')",
                                        backgroundSize: "180px"
                                    }}
                                />

                                <img
                                    src={
                                        item.image?.url
                                            ? processImageUrl(item.image.url)
                                            : '/assets/logo.png'
                                    }
                                    alt={item.title}
                                    className="relative z-10 w-full max-w-lg mx-auto object-contain hover:scale-105 transition-transform duration-500"
                                />

                            </div>

                        </div>

                        {/* DETAILS */}
                        <div className="flex flex-col justify-center">

                            <div className="inline-flex self-start bg-[#fff1e8] text-[#F15B40] px-5 py-2 rounded-full text-sm font-black uppercase tracking-[2px] mb-6">
                                Cluck Clucks Menu
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F15B40] leading-[1.05] tracking-[-0.03em] mb-8">
                                {item.title}
                            </h1>

                            <p className="text-[#894207] text-lg leading-[2] mb-10">
                                {item.description}
                            </p>

                            {/* REVIEWS */}
                            <div className="border-t border-[#f1dfd0] pt-8">

                                <div className="flex items-center justify-between mb-8">

                                    <h2 className="text-3xl font-black text-[#894207]">
                                        Reviews
                                    </h2>

                                    <div className="bg-[#F15B40] text-white px-4 py-2 rounded-full text-sm font-bold">
                                        {(item.reviews || []).length} Reviews
                                    </div>

                                </div>

                                <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">

                                    {(item.reviews || []).length > 0 ? (

                                        item.reviews.map((review: any, idx: number) => (

                                            <div
                                                key={idx}
                                                className="bg-[#fffaf7] border border-[#f3e3d3] rounded-2xl p-6 hover:shadow-md transition-shadow"
                                            >

                                                <div className="flex items-center justify-between mb-4">

                                                    <div>

                                                        <h3 className="font-black text-[#894207] text-lg">
                                                            {review.name || 'Anonymous'}
                                                        </h3>

                                                        <p className="text-sm text-[#b18463]">
                                                            {review.date || ''}
                                                        </p>

                                                    </div>

                                                    <div className="flex gap-1">

                                                        {[1, 2, 3, 4, 5].map((star) => (

                                                            <span
                                                                key={star}
                                                                className="text-[#F3C317] text-lg"
                                                            >
                                                                ★
                                                            </span>

                                                        ))}

                                                    </div>

                                                </div>

                                                <p className="text-[#894207] leading-[1.9]">
                                                    {review.comment}
                                                </p>

                                            </div>

                                        ))

                                    ) : (

                                        <div className="bg-[#fffaf7] border border-dashed border-[#e8cdb7] rounded-2xl p-10 text-center">

                                            <h3 className="text-2xl font-bold text-[#894207] mb-3">
                                                No Reviews Yet
                                            </h3>

                                            <p className="text-[#b18463]">
                                                Be the first to share your experience.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* REVIEW FORM */}
                    <div className="border-t border-[#f1dfd0] bg-[#fffaf7] px-8 lg:px-14 py-12">

                        <div className="max-w-3xl">

                            <h2 className="text-4xl font-black text-[#894207] mb-4">
                                Leave a Review
                            </h2>

                            <p className="text-[#b18463] text-lg mb-10">
                                Tell us about your experience with this menu item.
                            </p>

                            <ReviewForm />

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}