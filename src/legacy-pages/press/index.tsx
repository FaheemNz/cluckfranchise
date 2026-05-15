import React from 'react';
import Pagebanner from '../../components/common/Pagebanner';
import ErrorBoundary from '../../components/Home/ErrorBoundary';

// Press images data structure
const pressImages = [
    {
        url: '/assets/press/halal-image1.avif',
        title: 'Halal Image 1',
        alt: 'Halal certified chicken preparation'
    },
    {
        url: '/assets/press/halal-image2.jpg',
        title: 'Halal Image 2',
        alt: 'Fresh halal chicken products'
    },
    {
        url: '/assets/press/halal-image3.jpg',
        title: 'Halal Image 3',
        alt: 'Quality halal chicken display'
    }
];

// Press mentions data structure
const pressMentions = [
    {
        id: 1,
        publication: 'TRNTO',
        date: 'July 6, 2023',
        headline: "TORONTO'S BEST SPOTS FOR FRIED CHICKEN",
        imageUrl: '/assets/press/press_1.png',
        link: 'https://streetsoftoronto.com/best-fried-chicken-toronto/'
    },
    {
        id: 2,
        publication: 'blogTO',
        date: 'September 12, 2020',
        headline: 'THE TOP 10 CHICKEN AND WAFFLES IN TORONTO',
        imageUrl: '/assets/press/press_2.webp',
        link: 'https://www.blogto.com/eat_drink/2014/06/the_top_10_chicken_and_waffles_in_toronto/'
    },
    {
        id: 3,
        publication: 'DailyHive',
        date: 'January 9, 2019',
        headline: 'YOU CAN GET A FRIED CHICKEN TACO WITH A WAFFLE SHELL ON QUEEN STREET WEST',
        imageUrl: '/assets/press/press_3.avif',
        link: 'https://dailyhive.com/toronto/cluck-clucks-twaco-fried-chicken-waffle-taco-queen-west'
    },
    {
        id: 4,
        publication: 'TORONTO LIFE',
        date: '',
        headline: 'THE BEST FRIED CHICKEN SANDWICHES IN TORONTO RIGHT NOW',
        imageUrl: '/assets/press/press_4.png',
        link: 'https://torontolife.com/food/best-fried-chicken-sandwiches-toronto-right-now/'
    },
    {
        id: 5,
        publication: 'STYLE DEMOCRACY',
        date: 'July 6, 2017',
        headline: "HERE'S WHERE TO GET THE BEST FRIED CHICKEN IN TORONTO",
        imageUrl: '/assets/press/press_5.png',
        link: 'https://www.styledemocracy.com/heres-get-best-fried-chicken-toronto/'
    },
    {
        id: 6,
        publication: 'Global NEWS',
        date: 'January 17, 2017',
        headline: 'BEST RESTAURANTS IN CANADA, ACCORDING TO YELP REVIEWS',
        imageUrl: '/assets/press/press_6.png',
        link: 'https://globalnews.ca/news/3186386/best-restaurants-in-canada-according-to-yelp-reviews/'
    },
    {
        id: 7,
        publication: 'VIEW the VIBE',
        date: 'July 6, 2017',
        headline: 'BEST IN THE 6IX: THE TOP 10 PLACES TO GET FRIED CHICKEN IN TORONTO',
        imageUrl: '/assets/press/press_7.png',
        link: 'https://viewthevibe.com/the-10-best-places-to-get-fried-chicken-in-toronto/'
    },
    {
        id: 8,
        publication: 'NARCITY',
        date: 'September 13, 2016',
        headline: '15 TORONTO PLACES YOU NEED TO VISIT TO SATISFY YOUR FRIED CHICKEN CRAVINGS',
        imageUrl: '/assets/press/press_8.png',
        link: 'https://www.narcity.com/toronto/15-places-in-toronto-you-need-to-visit-to-satisfy-your-fried-chicken-cravings'
    },
    {
        id: 9,
        publication: 'DH',
        date: 'January 23, 2025',
        headline: "CLUCK CLUCK'S OPENING CALGARY",
        imageUrl: '/assets/press/press_9.avif',
        link: 'https://dailyhive.com/calgary/cluck-clucks-opening-calgary'
    },
    {
        id: 10,
        publication: 'PR Newswire',
        date: 'January 23, 2025',
        headline: "CLUCK CLUCK'S FIRST LOCATION US LOCATION IN HOUSTON, TX",
        imageUrl: '/assets/press/press_10.avif',
        link: 'https://www.prnewswire.com/news-releases/canadian-favorite-cluck-clucks-brings-its-famous-fried-chicken-and-waffles-to-the-us-with-first-location-in-texas-302357724.html'
    },
    {
        id: 11,
        publication: 'STREETS OF TORONTO',
        date: 'June 24, 2024',
        headline: "TORONTO'S BEST SPOTS FOR FRIED CHICKEN",
        imageUrl: '/assets/press/press_11.avif',
        link: 'https://streetsoftoronto.com/best-fried-chicken-toronto/'
    },
    {
        id: 12,
        publication: 'HC',
        date: 'July 7, 2024',
        headline: 'CLUCK CLUCKS OPEN IN FORT BEND',
        imageUrl: '/assets/press/press_12.avif',
        link: 'https://www.houstonchronicle.com/neighborhood/fort-bend/article/fort-bend-new-food-roundup-19553316.php'
    },
    {
        id: 13,
        publication: 'CBC',
        date: 'May 17, 2025',
        headline: "CANADA'S COUNTER-TARIFFS ARE HURTING SMALL BUSINESSES. EVEN SO, MANY STILL SUPPORT THEM",
        imageUrl: '/assets/press/press_13.avif',
        link: 'https://www.cbc.ca/news/business/tariffs-small-business-1.7484510'
    },
    {
        id: 14,
        publication: 'BBC',
        date: 'July 8, 2025',
        headline: 'HOW TARIFFS ARE SHIFTING GLOBAL SUPPLY CHAINS',
        imageUrl: '/assets/press/press_14.avif',
        link: 'https://www.bbc.com/news/articles/c93l6n32ne5o'
    }
];

// Accolades data structure
const accolades = [
    {
        id: 1,
        name: 'Restaurant Guru',
        imageUrl: '/assets/press/accolades_1.avif',
        alt: 'Restaurant Guru Award'
    },
    {
        id: 2,
        name: 'Top Choice Awards',
        imageUrl: '/assets/press/accolades_2.avif',
        alt: 'Top Choice Awards Recognition'
    },
    {
        id: 3,
        name: 'Taste Toronto',
        imageUrl: '/assets/press/accolades_3.avif',
        alt: 'Taste Toronto Award'
    }
];

const Press: React.FC = () => {
    return (
        <ErrorBoundary>
            <Pagebanner title="Press" />
            <main className="min-h-screen flex flex-col">
                {/* Press Mentions Section */}
                <section className="w-full bg-white py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        {/* Press Mentions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-11">
                            {pressMentions.map((mention) => (
                                <div key={mention.id} className="bg-white text-center mt-5">
                                    {/* Publication Logo/Name */}
                                    <div className="mb-4 md:mb-6">
                                        <img
                                            src={mention.imageUrl}
                                            alt={`${mention.publication} logo`}
                                            className="max-w-[300px] max-h-[57px] object-contain mx-auto"
                                        />
                                    </div>
                                    <p className="text-[19px] text-[#666666] mb-4 font-sans">{mention.date}</p>
                                    <h3 className="text-[21px] font-bold text-[#F15B40] leading-tight uppercase font-[MDNichrome-Black] tracking-[1px]">
                                        <a 
                                            href={mention.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline transition-all duration-200 hover:text-[#d14a35]"
                                        >
                                            {mention.headline}
                                        </a>
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Accolades & Recognitions Section */}
                <section className="w-full bg-white py-12">
                    <div className=" px-4 md:px-6">
                        <h3 className="pm-custom-section-subheading pm-h3 mt-7">
                            Accolades & Recognitions
                        </h3>

                        {/* Accolades Grid */}
                        <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[100px] 2xl:gap-[150px] mt-8 justify-center items-center">
                            {accolades.map((accolade) => (
                                <div key={accolade.id} className="flex justify-center items-center">
                                    <img
                                        src={accolade.imageUrl}
                                        alt={accolade.alt}
                                        className="max-w-[300px] lg:max-w-[250px] xl:max-w-[350px] 2xl:max-w-[450px] h-[90px] object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full bg-[#F3C317] py-3">
                    <div className="w-full">
                        {/* Grid layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">

                            {/* Press Images */}
                            {pressImages.map((img, idx) => (
                                <div key={idx} className="rounded-[32px] overflow-hidden shadow-lg w-full">
                                    <img
                                        src={img.url}
                                        alt={img.alt}
                                        loading="lazy"
                                        className="object-cover w-full h-96 md:h-[32rem] transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

            </main>
        </ErrorBoundary>
    );
};

export default Press;

