const UNSPLASH_KEY = process.env.UNSPLASH_KEY;

if (!UNSPLASH_KEY) {
  throw new Error(
    "UNSPLASH_KEY environment variable is not defined. Set it before running the application."
  );
}
/**
 * Searches Unsplash for a product image.
 * @param {string} name - Product name (e.g. rice, milk, sugar)
 * @returns {Promise<string|null>} Image URL or null if not found.
 */
export async function getImageUri(name) {
  if (!name?.trim()) return null;

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", name);
  url.searchParams.set("per_page", "1");
  url.searchParams.set("orientation", "squarish");

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  const data = await response.json();

  return data.results?.[0]?.urls?.regular ?? null;
}
