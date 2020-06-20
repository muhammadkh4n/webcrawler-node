import cheerio from 'cheerio';

/**
 * Parses html string to find links and titles of the google search
 * 
 * @param {string} content html string
 * @returns {Array<{ title: string, url: string }>} search results
 */
export default (content) => {
  const $ = cheerio.load(content);
  const resultsSelector = '.rc .r a';
  const results = [];

  $(resultsSelector).each((_, el) => {
    const title = $(el).find('h3').text();
    const link = $(el).attr('href');
    if (title && link) {
      results.push({ title, link });
    }
  });

  return results;
};
