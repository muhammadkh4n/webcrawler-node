const GOOGLE_SEARCH_URL = 'https://www.google.com/search';

/**
 * Builds the google search url with query terms
 * 
 * @param {string} query query term
 * @param {number} numResults number of search results
 */
export const urlBuilder = (query, numResults = 10) => {
  const encodedQuery = encodeURIComponent(query);
  return `${GOOGLE_SEARCH_URL}?q=${encodedQuery}&num=${numResults}`;
};
