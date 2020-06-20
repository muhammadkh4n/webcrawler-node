import puppeteer from 'puppeteer';

/**
 * Loads a browser navigates to the url and fetches content of the page as string.
 * 
 * @param {{ url: string }} options Fetcher options
 */
export default async ({ url }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const viewport = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: 'networkidle2' });
  const content = await page.content();
  await browser.close();

  return content;
};
