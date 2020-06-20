import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    args: ['--start-maximized']
  });
  const page = await browser.newPage();
  const viewport = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  await page.setViewport(viewport);
  await page.goto('https://www.google.com/search?q=lahore+covid+cases', { waitUntil: 'networkidle2' });
  
  const content = await page.content();
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

  await browser.close();

  const data = JSON.stringify(results, null, 2);
  fs.writeFile(
    path.join(__dirname, 'store', 'results.json'),
    data,
    () => console.log('file written!'));
})();
