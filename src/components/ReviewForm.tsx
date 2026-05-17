'use client';

import ReCAPTCHA from 'react-google-recaptcha';

export default function ReviewForm() {

    return (

        <form className="space-y-6">

            <div>

                <textarea
                    placeholder="Share your experience..."
                    className="w-full border border-[#d8c4b2] bg-white rounded-2xl p-5 h-40 text-[#894207] placeholder:text-[#b18463] focus:outline-none focus:ring-2 focus:ring-[#F15B40] transition-all"
                />

            </div>

            <div>

                <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full border border-[#d8c4b2] bg-white rounded-2xl p-5 text-[#894207] placeholder:text-[#b18463] focus:outline-none focus:ring-2 focus:ring-[#F15B40] transition-all"
                />

            </div>

            <div className="flex justify-start overflow-hidden">

                <div className="scale-[0.95] origin-left">

                    <ReCAPTCHA
                        sitekey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
                        }
                    />

                </div>

            </div>

            <div className="flex justify-end pt-2">

                <button
                    type="submit"
                    className="bg-[#F15B40] hover:bg-[#d94d35] text-white font-black text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#F15B40]/20"
                >
                    Submit Review
                </button>

            </div>

        </form>

    );
}