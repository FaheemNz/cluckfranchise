export async function getCMSData() {
  const res = await fetch('https://cluckcluckschicken.com/admin/api/updates', {
    headers: { 'X-API-KEY': process.env.API_KEY! },
    next: { revalidate: 300 }
  });
  const result = await res.json();
  return result.updates;
}