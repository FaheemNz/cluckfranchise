import Link from "next/link";

import OptimizedImage from "@/src/components/Home/OptimizedImage";

const Footer = () => {

    return (

        <footer className="relative">

            {/* Main Footer Content */}
            <div
                className="text-center bg-[#f15b40] py-5 relative overflow-hidden bg-repeat bg-[length:160px_auto] bg-center shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]"
                style={{
                    backgroundImage:
                        "url('/assets/boximg.avif')",
                }}
            >

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-12">

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/cluckclucks/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                    >
                        <span className="text-white font-bold text-2xl md:text-3xl">
                            f
                        </span>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/cluckcluks/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                    >
                        <svg
                            className="w-6 h-6 md:w-8 md:h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                        >
                            <rect
                                x="2"
                                y="2"
                                width="20"
                                height="20"
                                rx="5"
                                ry="5"
                            />

                            <circle
                                cx="12"
                                cy="12"
                                r="3.5"
                            />

                            <circle
                                cx="16"
                                cy="8"
                                r="1.5"
                                fill="currentColor"
                            />
                        </svg>
                    </a>

                    {/* YouTube */}
                    <a
                        href="https://www.youtube.com/@CLUCKCLUCKS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                    >
                        <svg
                            className="block w-7 h-7 md:w-9 md:h-9 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M23.5 6.2s-.2-1.6-.8-2.3c-.8-.8-1.7-.8-2.1-.9C17.7 2.7 12 2.7 12 2.7s-5.7 0-8.6.3c-.4.1-1.3.1-2.1.9-.6.7-.8 2.3-.8 2.3S0 8.1 0 10v2c0 1.9.5 3.8.5 3.8s.2 1.6.8 2.3c.8.8 1.9.8 2.4.9 1.7.2 7.3.3 7.3.3s5.7 0 8.6-.3c.4-.1 1.3-.1 2.1-.9.6-.7.8-2.3.8-2.3s.5-1.9.5-3.8v-2c0-1.9-.5-3.8-.5-3.8zM9.5 14.7V7.9l6.3 3.4-6.3 3.4z" />
                        </svg>
                    </a>

                </div>

                {/* Navigation Links */}
                <div className="flex justify-center space-x-4 md:space-x-8 flex-wrap px-4">

                    <Link 
                        prefetch={false}
                        href="/order"
                        className="text-lg md:text-[23px] text-white font-bold font-[MDNichrome-Black] uppercase hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        ORDER ONLINE
                    </Link>

                    <Link
                        prefetch={false}
                        href="/locations"
                        className="text-lg md:text-[23px] font-[MDNichrome-Black] text-white font-bold uppercase hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        LOCATIONS
                    </Link>

                    <Link
                        prefetch={false}
                        href="/franchising"
                        className="text-lg md:text-[23px] font-[MDNichrome-Black] text-white font-bold uppercase hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        FRANCHISING
                    </Link>

                    <Link
                        prefetch={false}
                        href="/contact"
                        className="text-lg md:text-[23px] font-[MDNichrome-Black] text-white font-bold uppercase hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        CONTACT US
                    </Link>

                </div>

                {/* Logo Section */}
                <div className="my-5">

                    <Link
                        prefetch={false}
                        href="/"
                        className="inline-block hover:opacity-80 transition-all duration-300 transform hover:scale-105"
                    >

                        <div className="inline-block">

                            <OptimizedImage
                                src="/assets/logo_white.png"
                                alt="Cluck Clucks Logo"
                                className="h-20 md:h-[115px] w-auto object-contain brightness-0 invert"
                                loading="lazy"
                            />

                        </div>

                    </Link>

                </div>

                {/* Separator Line */}
                <div className="h-[2px] bg-white mx-4 md:mx-20 lg:mx-32 xl:mx-40" />

                {/* Accessibility Section */}
                <div className="my-5">

                    <p className="text-white text-lg">
                        Cluck Clucks Chicken and Waffles and its subsidiary are
                        registered trademarks of Twisted Franchising Concepts Inc.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;