'use client'

import React from 'react';
import Link from 'next/link';
import ErrorBoundary from '../../components/Home/ErrorBoundary';

const NotFound: React.FC = () => {
    return (
        <ErrorBoundary>
            <div className="py-8 bg-white flex items-center justify-center px-4">
                <div className="max-w-2xl mx-auto text-center">
                    {/* 404 Number */}
                    <div className="mb-8">
                        <h1 className="text-9xl font-extrabold text-[#F15B40] font-[MDNichrome-Black] tracking-tight">
                            404
                        </h1>
                    </div>

                    {/* Error Message */}
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#894207] mb-4 font-[MDNichrome-Black] uppercase tracking-wide">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-lg md:text-xl text-[#663300] leading-relaxed">
                            The page you're looking for seems to have flown the coop!
                            Don't worry, our delicious chicken is still here.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <Link
                            prefetch={false}
                            href="/"
                            className="inline-block bg-[#F15B40] hover:bg-[#d14a35] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            🏠 Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default NotFound;
