import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/tmp/catalyst_screenshots';
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const ctx = await browser.newContext({ viewport: { width: 430, height: 932 } });
const page = await ctx.newPage();

await page.goto('http://localhost:38333/#/evening', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Scroll to bottom and click Event Staff
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.click('text=Event Staff');
await page.waitForTimeout(400);

// Fill PIN and click Unlock button
const pinInput = await page.$('input[type="password"]');
await pinInput.fill('1234');
await page.waitForTimeout(200);
await page.click('button:has-text("Unlock")');
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/admin_unlocked_correct.png` });

const text = await page.textContent('body');
console.log('Admin unlocked: has Tap item text=' + text.includes('Tap an item'));
console.log('Admin: has schedule buttons=' + text.includes('Cocktail'));

// Click the first schedule item
const scheduleButtons = await page.$$('button');
// find one with Cocktail
let cocktailBtn = null;
for (const btn of scheduleButtons) {
  const t = await btn.textContent();
  if (t.includes('Cocktail')) { cocktailBtn = btn; break; }
}
if (cocktailBtn) {
  await cocktailBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/admin_item_selected.png` });
  console.log('Clicked Cocktail item - checking active highlight');
  // Check if it turned orange
  const style = await cocktailBtn.evaluate(el => el.style.background || window.getComputedStyle(el).background);
  console.log('Button background:', style);
}

// Now check the Give ticker at top of Give page
await page.goto('http://localhost:38333/#/give', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/give_ticker_top.png`, fullPage: false });
const giveText = await page.textContent('body');
console.log('Give ticker text (RAISED TONIGHT):', giveText.includes('RAISED TONIGHT'));
console.log('Give starting amount:', giveText.match(/\$[\d,]+/)?.[0]);

await browser.close();
console.log('DONE');
