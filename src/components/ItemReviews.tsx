interface ItemReviewsProps {
    reviews: any[];
    initialCount?: number;
}

export default function ItemReviews({
    reviews = [],
    initialCount = 0,
}: ItemReviewsProps) {
    const reviewCount = reviews.length || initialCount;

    const getUsername = (review: any): string => {
        return (
            review.username ||
            review.name ||
            review.email?.split('@')?.[0] ||
            'Anonymous'
        );
    };

    const getReviewDate = (review: any): string => {
        return review.created_at || review.date || '';
    };

    return (
        <div className="border-t border-[#f1dfd0] pt-5">
            <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-2xl sm:text-3xl font-black text-[#894207]">
                    Reviews
                </h2>

                <div className="bg-[#F15B40] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                    {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
                </div>
            </div>

            <div className="space-y-4 max-h-[330px] overflow-y-auto pr-2">
                {reviews.length > 0 ? (
                    reviews.map((review: any, idx: number) => (
                        <div
                            key={review.id || idx}
                            className="bg-[#fffaf7] border border-[#f3e3d3] rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow"
                        >
                            <div className="mb-3">
                                <h3 className="font-black text-[#894207] text-base sm:text-lg leading-tight">
                                    {getUsername(review)}
                                </h3>

                                {getReviewDate(review) && (
                                    <p className="text-xs sm:text-sm text-[#b18463] mt-1">
                                        {getReviewDate(review)}
                                    </p>
                                )}
                            </div>

                            <p className="text-[#894207] leading-[1.75] text-sm sm:text-base">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : initialCount > 0 ? (
                    <div className="bg-[#fffaf7] border border-dashed border-[#e8cdb7] rounded-2xl p-7 text-center">
                        <h3 className="text-xl font-bold text-[#894207] mb-2">
                            Reviews Temporarily Unavailable
                        </h3>

                        <p className="text-[#b18463]">
                            {initialCount} {initialCount === 1 ? 'review exists' : 'reviews exist'}, but details could not be loaded right now.
                        </p>
                    </div>
                ) : (
                    <div className="bg-[#fffaf7] border border-dashed border-[#e8cdb7] rounded-2xl p-7 text-center">
                        <h3 className="text-xl font-bold text-[#894207] mb-2">
                            No Reviews Yet
                        </h3>

                        <p className="text-[#b18463]">
                            Be the first to share your experience.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}