import React, { useState, useEffect } from "react";
import Pagebanner from "../../components/common/Pagebanner";
import { useGlobalData } from "../../services/globalDataManager";

export default function OrderOnline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [locations, setLocations] = useState<any[]>([]);
  const globalData = useGlobalData();

  useEffect(() => {
    if (globalData.isLoaded && globalData.data) {
      const canadaData = globalData.getPageData("canada-locations");
      const usaData = globalData.getPageData("usa-locations");
      const canadaCards =
        canadaData?.sections?.locationsSection?.cards || [];
      const usaCards = usaData?.sections?.locationsSection?.cards || [];

      setLocations([...canadaCards, ...usaCards]);
    } else if (!globalData.isLoaded && !globalData.isLoading) {
      globalData.fetchData();
    }
  }, [globalData.isLoaded, globalData.data]);

  return (
    <>
      <Pagebanner title="Order Online" />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-28 text-center">
          {locations.length > 0 ? (
            locations.map((loc, idx) => {
              const title = loc.title || "Unnamed";
              const address1 = loc.address1 || "";
              const address2 = loc.address2 || "";
              const name = loc.title || "";
              const orderLink =
                loc.links?.primary?.order ||
                loc.links?.order ||
                loc.link ||
                "#";

              return (
                <div key={idx}>
                  {/* Title */}
                  <h2
                    style={{
                      fontFamily:
                        '"MDNichrome", "Arial Black", "Helvetica Black", sans-serif',
                    }}
                    className="text-[#E75C47] font-black text-3xl mb-6 uppercase tracking-[-0.06em] font-[Montserrat]"
                  >
                    {title}
                  </h2>

                  {/* Address 1 */}
                  {address1 && (
                    <div className="text-[#8B4F19] text-lg font-normal font-[Montserrat] leading-snug mb-2">
                      {address1}
                    </div>
                  )}

                  {/* Address 2 */}
                  {address2 && (
                    <div className="text-[#8B4F19] text-lg font-normal font-[Montserrat] leading-snug mb-4">
                      {address2}
                    </div>
                  )}

                  {/* Name */}
                  {name && (
                    <div className="text-[#8B4F19] text-lg font-semibold font-[Montserrat] mb-6">
                      {name}
                    </div>
                  )}

                  {/* Order Button */}
                  <div className="inline-block group">
                    <a
                      href={orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveIdx(idx)}
                      className={`font-bold text-lg uppercase font-[Montserrat] inline-flex items-center gap-1 mb-1
                        transition-all duration-300 tracking-[0.05em]
                        ${activeIdx === idx ? "text-black" : "text-[#E75C47]"}
                        group-hover:text-black
                      `}
                      style={{
                        fontWeight: activeIdx === idx ? "900" : "bold",
                      }}
                    >
                      ORDER <span className="text-xl font-extrabold">&raquo;</span>
                    </a>
                    <div
                      className={`border-b-[3px] w-28 mx-auto mt-1
                        transition-all duration-300
                        ${activeIdx === idx ? "border-black w-36" : "border-[#E75C47]"}
                        group-hover:border-black group-hover:w-36
                      `}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-gray-500 text-lg">
              Loading locations...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
