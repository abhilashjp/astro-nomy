import { getCollection } from 'astro:content';

/**
 * Get published content from any collection, filtering out drafts in production
 * @param {string} collectionName - Name of the collection to query
 * @returns {Promise<Array>} Filtered collection entries
 */
export async function getPublishedContent(collectionName) {
  return await getCollection(collectionName, ({ data }) => {
    // Skip if marked as draft
    if (data.draft === true) return false;
    
    // Skip if marked to exclude from build (production only)
    if (import.meta.env.PROD && data.excludeFromBuild === true) return false;
    
    // Skip if marked as development only (production only)
    if (import.meta.env.PROD && data.devOnly === true) return false;
    
    // For guides collection, also respect the existing 'published' field
    if (collectionName === 'guides' && data.published === false) return false;
    
    return true;
  });
}

// Convenience functions for each collection
export const getPublishedPosts = () => getPublishedContent('blog');
export const getPublishedDocs = () => getPublishedContent('docs');
export const getPublishedGuides = () => getPublishedContent('guides');
export const getPublishedReleases = () => getPublishedContent('releases');