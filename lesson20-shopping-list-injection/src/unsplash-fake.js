const imageUris = {
  milk: "https://images.example.test/milk.jpg",
  bread: "https://images.example.test/bread.jpg",
  balloons: "https://images.example.test/balloons.jpg",
  ballons: "https://images.example.test/balloons.jpg",
};

/**
 * Returns a fake image URI for supported product names.
 * @param {string} name Product name.
 * @returns {Promise<string|null>} Fake image URI, or null if not found.
 */
export async function getImageUri(name) {
  if (!name?.trim()) return null;

  return imageUris[name.trim().toLowerCase()] ?? null;
}
