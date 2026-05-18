import Link from 'next/link';
import Pagebanner from '@/src/components/common/Pagebanner';
import { processImageUrl } from '@/src/utils/imageUtils';
import { slugify } from '@/src/utils/slugify';
import ReviewForm from '@/src/components/ReviewForm';
import ItemReviews from '@/src/components/ItemReviews';
import { fetchReviews } from '@/src/services/reviewService';

interface ItemPageProps {
    cmsData: any;
    menuData: any;
    slug: string;
}

export default async function ItemPage({
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

            <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] px-4">

                <div className="bg-white border border-[#f3e3d3] rounded-[24px] shadow-[0_14px_40px_rgba(0,0,0,0.08)] p-8 text-center max-w-md w-full">

                    <h1 className="text-3xl font-black text-[#F15B40] mb-3">
                        Item Not Found
                    </h1>

                    <p className="text-[#894207] mb-6">
                        The menu item you are looking for is not available.
                    </p>

                    <Link
                        prefetch={false}
                        href="/menu"
                        className="inline-flex items-center justify-center bg-[#F15B40] text-white px-6 py-3 rounded-full font-black uppercase tracking-wide hover:bg-[#894207] transition-colors"
                    >
                        Back to Menu
                    </Link>

                </div>

            </div>

        );
    }

    let reviews: any[] = [];

    try {
        const reviewsResponse = await fetchReviews(item.id);
        reviews = reviewsResponse?.data?.reviews || [];
    } catch (error) {
        console.error('Failed to fetch item reviews:', error);
        reviews = [];
    }

    const itemImage =
        item.image?.url
            ? processImageUrl(item.image.url)
            : '/assets/logo.png';

    const reviewCount = item.reviews_count || reviews.length || 0;

    const availableLocations =
        item.locations || [];

    return (

        <>

            <Pagebanner title={item.title} />

            <main className="background-images min-h-screen py-5 sm:py-6 lg:py-8 px-3 sm:px-5">

                <div className="max-w-6xl mx-auto">

                    {/* Breadcrumb */}
                    <nav className="mb-3">
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-[#f3e3d3] rounded-full px-4 py-2 shadow-sm text-sm text-[#894207]">

                            <Link
                                prefetch={false}
                                href="/menu"
                                className="font-bold hover:text-[#F15B40] transition-colors"
                            >
                                Menu
                            </Link>

                            <span className="text-[#c9a48b]">/</span>

                            <span className="font-semibold truncate max-w-[220px] sm:max-w-none">
                                {item.title}
                            </span>

                        </div>
                    </nav>

                    {/* Hero Card */}
                    <section className="bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_14px_42px_rgba(89,45,12,0.09)] border border-[#f3e3d3] overflow-hidden">

                        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr] gap-0">

                            {/* Image Side */}
                            <div className="relative bg-gradient-to-br from-[#fff7f2] via-[#fffaf7] to-[#ffe9dc] p-5 sm:p-6 lg:p-7 flex items-center justify-center min-h-[240px] lg:min-h-[420px]">

                                <div
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: "url('/assets/boximg.avif')",
                                        backgroundSize: "150px"
                                    }}
                                />

                                <div className="absolute top-4 left-4 bg-white/90 border border-[#f3e3d3] rounded-full px-3 py-1.5 shadow-sm">
                                    <span className="text-[11px] font-black text-[#F15B40] uppercase tracking-[1.6px]">
                                        Menu Item
                                    </span>
                                </div>

                                <div className="relative z-10 w-full max-w-[360px]">

                                    <div className="bg-white/70 border border-white rounded-[24px] p-4 sm:p-5 shadow-[0_12px_30px_rgba(137,66,7,0.10)]">

                                        <img
                                            src={itemImage}
                                            alt={item.title}
                                            className="w-full h-auto max-h-[300px] object-contain mx-auto drop-shadow-[0_14px_18px_rgba(0,0,0,0.12)] hover:scale-[1.03] transition-transform duration-500"
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* Detail Side */}
                            <div className="p-5 sm:p-6 lg:p-8 flex flex-col">

                                <div className="flex flex-wrap items-center gap-2 mb-4">

                                    <div className="inline-flex bg-[#fff1e8] text-[#F15B40] px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[1.6px]">
                                        Cluck Clucks
                                    </div>

                                    <div className="inline-flex items-center gap-2 bg-[#F15B40] text-white px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide">
                                        {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
                                    </div>

                                </div>

                                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-[#F15B40] leading-[1] tracking-[-0.04em] mb-4">
                                    {item.title}
                                </h1>

                                <p className="text-[#894207] text-base sm:text-[17px] leading-[1.7] mb-5 max-w-2xl">
                                    {item.description}
                                </p>

                                {/* Available Locations */}
                                {availableLocations.length > 0 && (

                                    <div className="mb-6">

                                        <h2 className="text-xs font-black text-[#894207] uppercase tracking-[1.8px] mb-2">
                                            Available At
                                        </h2>

                                        <div className="flex flex-wrap gap-2">

                                            {availableLocations.map((loc: any) => (

                                                <span
                                                    key={loc.id || loc.title}
                                                    className="inline-flex items-center bg-[#fffaf7] border border-[#f1dfd0] text-[#894207] px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold"
                                                >
                                                    {loc.title}
                                                </span>

                                            ))}

                                        </div>

                                    </div>

                                )}

                                {/* Reviews */}
                                <div className="mt-1">
                                    <ItemReviews
                                        reviews={reviews}
                                        initialCount={reviewCount}
                                    />
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* Review Form */}
                    <section className="mt-5 sm:mt-6 bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_14px_42px_rgba(89,45,12,0.07)] border border-[#f3e3d3] overflow-hidden">

                        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr]">

                            <div className="bg-[#fffaf7] border-b lg:border-b-0 lg:border-r border-[#f1dfd0] p-5 sm:p-6 lg:p-7 flex flex-col justify-center">

                                <div className="inline-flex self-start bg-[#fff1e8] text-[#F15B40] px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[1.6px] mb-4">
                                    Your Opinion Matters
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-black text-[#894207] leading-tight mb-3">
                                    Leave a Review
                                </h2>

                                <p className="text-[#b18463] text-base leading-[1.7]">
                                    Tell us about your experience with this menu item.
                                </p>

                            </div>

                            <div className="p-5 sm:p-6 lg:p-7">
                                <ReviewForm />
                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </>

    );
}