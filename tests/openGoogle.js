const PuppeteerVideoRecorder = require('../index');
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const videoPath = path.resolve(__dirname, 'google/videos')
    const browser = await puppeteer.launch({ headless: true });
    const page = (await browser.pages())[0];
    const recorder = new PuppeteerVideoRecorder();
    await recorder.init(page, videoPath);
    await page.goto('https://google.com');
    await recorder.start();
    const input = await page.$('input[name=q]');
    await input.type('puppeteer-mass-screenshots', { delay: 50 });
    await input.press('Enter');
    await recorder.stop();
    await browser.close();
  })();
