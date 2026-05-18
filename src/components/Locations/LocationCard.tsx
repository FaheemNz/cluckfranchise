'use client'

import { useRouter } from "next/navigation";

interface LocationData {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  hours?: {
    mondayThursday?: string;
    fridaySaturday?: string;
    sunday?: string;
    timings?: Array<{ days: string; time: string }> | string[];
  };
  features: string[];
  links: {
    primary: {
      location: string;
      map: string;
      order: string;
      map_link?: string;
    };
    social: Array<{
      platform: string;
      url: string;
    }>;
  };
}

interface LocationCardProps {
  location: LocationData;
  onOrderOnline?: () => void;
  onLocationDetails?: () => void;
  className?: string;
  hideLocationDetails?: boolean;
}

const LocationCard = ({
  location,
  onOrderOnline,
  onLocationDetails,
  className = "",
  hideLocationDetails = false,
}: LocationCardProps) => {

  const router = useRouter();

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-8 w-full h-full ${className}`}
    >
      {/* Location Title */}
      {location.name && (
        <h3
          className="text-[32px] font-extrabold text-[#E5573D] text-center mb-6 uppercase font-['MDNichrome-Black']"
          style={{ letterSpacing: "0.1em" }}
        >
          {location.name}
        </h3>
      )}

      {/* Address Information */}
      {/* Address Information */}
      {location.address &&
        (location.address.street ||
          location.address.city ||
          location.address.province ||
          location.address.postalCode ||
          location.address.country) && (
          <div className="text-center text-[19px] font-normal mb-6">
            {/* Street (single line max, truncated if long) */}
            {location.address.street && (
              <p
                className="text-[#894105] mb-1 truncate text-ellipsis overflow-hidden"
                style={{ whiteSpace: "nowrap" }}
                title={location.address.street} // Tooltip for full address
              >
                {location.address.street}
              </p>
            )}

            {/* City + Province + Postal + Country (single line max, truncated if long) */}
            {(location.address.city ||
              location.address.province ||
              location.address.postalCode ||
              location.address.country) && (
                <p
                  className="text-[#894105] truncate text-ellipsis overflow-hidden"
                  style={{ whiteSpace: "nowrap" }}
                  title={[
                    location.address.city,
                    location.address.province,
                    location.address.postalCode,
                    location.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")} // Tooltip
                >
                  {[
                    location.address.city,
                    location.address.province,
                    location.address.postalCode,
                    location.address.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
          </div>
        )}

      {/* Get Directions Button */}
      {(location.links?.primary?.map_link || location.links?.primary?.map) && (
        <div className="text-center mb-4">
          <a
            href={
              location.links.primary.map_link ||
              location.links.primary.map ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-[19px] inline-flex !font-bold items-center justify-center bg-white border-[1px] border-[#894105] text-[#894105] py-3 px-6 rounded-lg hover:bg-white hover:border-black hover:text-black transition-all duration-200 uppercase tracking-wide"
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 16 16"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              color="inherit"
              aria-hidden="true"
            >
              <path
                d="M2 7.333l12.667-6-6 12.667-1.334-5.333L2 7.334z"
                stroke="currentColor"
              />
            </svg>
            GET DIRECTIONS
          </a>
        </div>
      )}

      {/* Phone Number */}
      {location.phone && (
        <div className="text-center mb-2">
          <a
            href={`tel:${location.phone}`}
            className="text-[#894105] text-[19px] hover:text-[#6b3204] transition-colors duration-200 cursor-pointer"
          >
            {location.phone}
          </a>
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="space-y-4 mb-8">
        {onOrderOnline && (
          <button
            onClick={onOrderOnline}
            className="w-full bg-[#f15b40] text-[16px] text-[#ffffff] font-bold py-4 px-6 rounded-lg hover:bg-[#f3c317] hover:text-[#653003] transition-all duration-200 uppercase tracking-wide"
          >
            ORDER ONLINE
          </button>
        )}
        {!hideLocationDetails && (
          <button
            onClick={() => {
              if (onLocationDetails) {
                onLocationDetails();
                return;
              }

              const slug = location.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "");

              router.push(`/${slug}`);
            }}
            className="w-full bg-[#f15b40] text-[16px] text-[#ffffff] font-bold py-4 px-6 rounded-lg hover:bg-[#f3c317] hover:text-[#653003] transition-all duration-200 uppercase tracking-wide"
          >
            LOCATION DETAILS + MENU
          </button>
        )}
      </div>

      {/* Operating Hours */}
      {location.hours &&
        (location.hours.mondayThursday ||
          location.hours.fridaySaturday ||
          location.hours.sunday ||
          location.hours.timings) && (
          <div className="text-center mb-8">
            <div className="space-y-3">
              {location.hours.timings ? (
                <div className="text-center">

                  <div className="space-y-2 text-[19px]">

                    {location.hours.timings.map(
                      (
                        timingItem: { days?: string; time?: string } | string,
                        index: number
                      ) => {

                        let days = "";
                        let time = "";

                        // Object format
                        if (
                          typeof timingItem === "object" &&
                          timingItem !== null &&
                          "days" in timingItem
                        ) {

                          days = timingItem.days || "";
                          time = timingItem.time || "";

                        } else {

                          // String format
                          const timingStr = String(timingItem || "");
                          const colonIndex = timingStr.indexOf(":");

                          days =
                            colonIndex !== -1
                              ? timingStr.substring(0, colonIndex).trim()
                              : timingStr;

                          time =
                            colonIndex !== -1
                              ? timingStr.substring(colonIndex + 1).trim()
                              : "";
                        }

                        return (

                          <div key={index} className="text-[#894105]">

                            <div className="font-bold">
                              {days}
                            </div>

                            {time && (
                              <div className="font-normal">
                                {time}
                              </div>
                            )}

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              ) : (
                <>
                  {location.hours.mondayThursday && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#894105] text-lg">
                        Monday - Thursday:
                      </span>
                      <span className="text-[#894105] text-lg">
                        {location.hours.mondayThursday}
                      </span>
                    </div>
                  )}
                  {location.hours.fridaySaturday && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#894105] text-lg">
                        Friday - Saturday:
                      </span>
                      <span className="text-[#894105] text-lg">
                        {location.hours.fridaySaturday}
                      </span>
                    </div>
                  )}
                  {location.hours.sunday && (
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#894105] text-lg">
                        Sunday:
                      </span>
                      <span className="text-[#894105] text-lg">
                        {location.hours.sunday}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

      {/* Social Media Icons */}
      {location.links?.social && location.links.social.length > 0 && (
        <div className="flex justify-center">
          {location.links.social.map((socialItem, index) => {
            // Determine which icon to show based on platform
            const platform = socialItem.platform.toLowerCase();
            const isFacebook = platform === "facebook";
            const isInstagram = platform === "instagram";
            const isWhatsApp = platform === "whatsapp";
            const isYouTube = platform === "youtube";
            const isTikTok = platform === "tiktok";
            const isSnapchat = platform === "snapchat";
            const isTwitter = platform === "twitter" || platform === "x";
            const isLinkedIn = platform === "linkedin";

            const getAriaLabel = () => {
              if (isFacebook) return "Follow us on Facebook";
              if (isInstagram) return "Follow us on Instagram";
              if (isWhatsApp) return "Contact us on WhatsApp";
              if (isYouTube) return "Subscribe to our YouTube channel";
              if (isTikTok) return "Follow us on TikTok";
              if (isSnapchat) return "Follow us on Snapchat";
              if (isTwitter) return "Follow us on X (Twitter)";
              if (isLinkedIn) return "Connect with us on LinkedIn";
              return "Follow us on social media";
            };

            return (
              <a
                key={index}
                href={socialItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#894105] hover:text-[#6b3204] transition-colors duration-200"
                aria-label={getAriaLabel()}
              >
                {isFacebook ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 1.333h-2a3.333 3.333 0 00-3.333 3.334v2h-2v2.667h2v5.333h2.666V9.334h2L12 6.667H9.333v-2A.667.667 0 0110 4h2V1.333z"
                      stroke="currentColor"
                    />
                  </svg>
                ) : isInstagram ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <g
                      clipPath="url(#instagram_svg__clip0_8_4533)"
                      stroke="currentColor"
                    >
                      <path d="M11.333 1.333H4.667a3.333 3.333 0 00-3.334 3.334v6.667a3.333 3.333 0 003.334 3.333h6.666a3.333 3.333 0 003.334-3.333V4.667a3.333 3.333 0 00-3.334-3.333z"></path>
                      <path d="M10.667 7.58a2.667 2.667 0 11-5.276.783 2.667 2.667 0 015.276-.783zm1-3.247h.006"></path>
                    </g>
                    <defs>
                      <clipPath id="instagram_svg__clip0_8_4533">
                        <path fill="currentColor" d="M0 0h16v16H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                ) : isWhatsApp ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1.333a6.667 6.667 0 00-6.667 6.667c0 1.2.333 2.333.933 3.333L1.333 14.667l3.333-1.333c1 .6 2.133.933 3.333.933a6.667 6.667 0 000-13.334z"
                      stroke="currentColor"
                    />
                    <path
                      d="M5.333 4.667a2.667 2.667 0 012.667 2.667"
                      stroke="currentColor"
                    />
                    <path
                      d="M8 8a2.667 2.667 0 002.667-2.667"
                      stroke="currentColor"
                    />
                  </svg>
                ) : isYouTube ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.667 4.667h10.666a1.333 1.333 0 011.333 1.333v4a1.333 1.333 0 01-1.333 1.333H2.667a1.333 1.333 0 01-1.333-1.333V6a1.333 1.333 0 011.333-1.333z"
                      stroke="currentColor"
                    />
                    <path
                      d="M6.667 8l2.667 1.333L6.667 10.667V8z"
                      stroke="currentColor"
                    />
                  </svg>
                ) : isTikTok ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1.333a6.667 6.667 0 100 13.334A6.667 6.667 0 008 1.333z"
                      stroke="currentColor"
                    />
                    <path d="M8 4.667v6.666" stroke="currentColor" />
                    <path d="M5.333 6.667h5.334" stroke="currentColor" />
                  </svg>
                ) : isSnapchat ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1.333c-3.333 0-6 2.667-6 6 0 1.333.333 2.667 1 3.667l1 2.333 2.333-1c1 .333 2 .5 3 .5s2-.167 3-.5l2.333 1 1-2.333c.667-1 1-2.333 1-3.667 0-3.333-2.667-6-6-6z"
                      stroke="currentColor"
                    />
                    <path d="M6.667 8h2.666" stroke="currentColor" />
                  </svg>
                ) : isTwitter ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M14.667 2.667a6.667 6.667 0 01-1.333 1.333c0 4-3 8.667-8.667 8.667a8.667 8.667 0 01-4.667-1.333"
                      stroke="currentColor"
                    />
                    <path
                      d="M4.667 6.667a4 4 0 014-4c2.667 0 4 2 4 4"
                      stroke="currentColor"
                    />
                    <path d="M8 12.667a4 4 0 01-4-4" stroke="currentColor" />
                  </svg>
                ) : isLinkedIn ? (
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 16 16"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    color="inherit"
                    fontSize="inherit"
                    aria-hidden="true"
                  >
                    <path
                      d="M4.667 2.667a2 2 0 100 4 2 2 0 000-4z"
                      stroke="currentColor"
                    />
                    <path
                      d="M2.667 14.667V6.667h4v8h-4z"
                      stroke="currentColor"
                    />
                    <path
                      d="M8.667 14.667V10.667c0-1.333.667-2.667 2-2.667s2 1.333 2 2.667v4h4V8.667c0-4-2.667-6-6-6s-6 2-6 6v6h4z"
                      stroke="currentColor"
                    />
                  </svg>
                ) : (
                  <p></p>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocationCard;
