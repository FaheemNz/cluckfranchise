import { unstable_cache } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function fetchCMSDataRaw() {
  console.log("FETCHING CMS FROM API");
  const res = await fetch(`${API_BASE_URL}/api/updates`, {
    headers: {
      "X-API-KEY": API_KEY || "",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`CMS API failed: ${res.status}`);
  }

  const result = await res.json();

  return result.updates || {};
}

export const getCMSData = unstable_cache(
  async () => {
    return fetchCMSDataRaw();
  },
  ["cms-data"],
  {
    revalidate: 300,
    tags: ["cms"],
  }
);

export const getMenuData = unstable_cache(
  async () => {
    console.log("FETCHING CMS FROM API");
    const res = await fetch(`${API_BASE_URL}/api/menu`, {
      headers: {
        "X-API-KEY": API_KEY || "",
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error(`Menu API failed: ${res.status}`);
    }

    const result = await res.json();

    return result.data?.menu || {};
  },
  ["menu-data"],
  {
    revalidate: 300,
    tags: ["menu"],
  }
);