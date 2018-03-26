const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--deterministic-fetch']});
  const page = await browser.newPage();
  const block_ressources = ['image', 'stylesheet', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];
  await page.setRequestInterception(true);

  page.on('request', request => {
        console.log('Requested' + request.url());
	if (
		block_ressources.indexOf(request.resourceType) > 0
		// Be careful with above
		|| request.url().includes('.jpg')
		|| request.url().includes('.jpeg')
		|| request.url().includes('.png')
		|| request.url().includes('.gif')
		|| request.url().includes('.css')
	)
		request.abort();
	else
		request.continue();
  });

  page.on('dialog', async dialog => {
    console.log('XSS FOUND');
    await dialog.dismiss();
  });
  console.log('Visiting http://localhost:8888/guestbookself')
  await page.goto('http://localhost:8888/guestbookself');
  await browser.close();
})();
