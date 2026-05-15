const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 
const API_KEY = process.env.API_KEY;

export async function getCMSData() {
  const res = await fetch(`${API_BASE_URL}/api/updates`, {
    headers: { 'X-API-KEY': API_KEY! },
    next: { revalidate: 300 }
  });
  const result = await res.json();
  return result.updates;
}

export async function getMenuData() {
  const res = await fetch(`${API_BASE_URL}/api/menu`, {
    headers: { 'X-API-KEY': API_KEY! },
    next: { revalidate: 300 }
  });
  const result = await res.json();
  return result.data.menu;
}