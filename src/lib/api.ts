const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getCMSData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/updates`, {
      headers: { "X-API-KEY": API_KEY! },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`CMS API Error: ${res.status}`);
    }

    const result = await res.json();

    return result.updates || [];
  } catch (error) {
    console.error("CMS DATA ERROR:", error);
    return [];
  }
}

export async function getMenuData() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/menu`, {
      headers: { "X-API-KEY": API_KEY! },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Menu API Error: ${res.status}`);
    }

    const result = await res.json();

    return result.data?.menu || [];
  } catch (error) {
    console.error("MENU DATA ERROR:", error);
    return [];
  }
}