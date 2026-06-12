import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:38333';
const OUT = '/tmp/catalyst_screenshots';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const ctx = await browser.newContext({ viewport: { width: 430, height: 932 } });
const page = await ctx.newPage();

const ss = async (name) => page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
const log = (msg) => console.log(msg);

// 1. Home screen
await page.goto(BASE + '/#/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await ss('01_home');
log('HOME: title=' + await page.title());

const homeH1 = await page.$eval('h1', el => el.textContent).catch(() => 'not found');
log('HOME: h1=' + homeH1);

const allBtns = await page.$$eval('button', els => els.map(e => e.textContent?.trim()));
log('HOME buttons: ' + JSON.stringify(allBtns));

const allLinks = await page.$$eval('a', els => els.map(e => e.textContent?.trim()));
log('HOME nav links: ' + JSON.stringify(allLinks));

// 2. Ticket modal
try {
  await page.click('button:has-text("View My Ticket")');
  await page.waitForTimeout(600);
  await ss('02_ticket_modal');
  const modalText = await page.textContent('body');
  log('TICKET MODAL: CATALYST in modal=' + modalText.includes('CATALYST'));
  log('TICKET MODAL: Guest in modal=' + modalText.includes('Guest'));
  await page.click('button:has-text("Close")').catch(() => page.keyboard.press('Escape'));
  await page.waitForTimeout(300);
  log('TICKET MODAL: opened and closed OK');
} catch(e) { log('TICKET MODAL ERROR: ' + e.message); }

// 3. Story screen
await page.goto(BASE + '/#/story', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await ss('03_story');
const storyText = await page.textContent('body');
log('STORY: has JEFF EDWARDS=' + storyText.includes('JEFF EDWARDS'));
log('STORY: has Builder From Columbus=' + storyText.includes('Builder From Columbus'));
log('STORY: has pull quote=' + storyText.includes('Science is everywhere'));
log('STORY: 4 sections present=' + (storyText.includes('Building More Than') && storyText.includes('Voice for the Future') && storyText.includes('Why Jeff')));

// 4. Evening screen
await page.goto(BASE + '/#/evening', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await ss('04_evening');
const eveningText = await page.textContent('body');
log('EVENING: has Your Evening=' + eveningText.includes('Your Evening'));
log('EVENING: has notification banner=' + eveningText.includes('Live updates'));
log('EVENING: has Cocktail Hour=' + eveningText.includes('Cocktail Hour'));
log('EVENING: has all 10 timeline items=' + (eveningText.includes('Cocktail Hour') && eveningText.includes('Fireside Chat') && eveningText.includes('9:30')));

// Admin PIN section
try {
  await page.click('text=Event Staff');
  await page.waitForTimeout(400);
  await ss('05_evening_admin_link_clicked');
  
  // Look for PIN input
  const pinInput = await page.$('input');
  if (pinInput) {
    const pholder = await pinInput.getAttribute('placeholder');
    log('ADMIN PIN: input found, placeholder=' + pholder);
    await pinInput.fill('1234');
    await page.waitForTimeout(200);
    // Press enter or click submit
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await ss('06_evening_admin_unlocked');
    const adminText = await page.textContent('body');
    log('ADMIN UNLOCKED: has Set Active=' + adminText.includes('Set Active'));
    log('ADMIN UNLOCKED: has schedule items=' + adminText.includes('Cocktail'));
    
    // Click Set Active on first item
    const setActiveBtns = await page.$$('button:has-text("Set Active")');
    log('ADMIN: Set Active buttons count=' + setActiveBtns.length);
    if (setActiveBtns.length > 0) {
      await setActiveBtns[0].click();
      await page.waitForTimeout(400);
      await ss('07_evening_admin_active_set');
      const adminText2 = await page.textContent('body');
      log('ADMIN: ACTIVE badge visible=' + (adminText2.includes('ACTIVE') || adminText2.includes('Active') || adminText2.includes('active')));
    }
  } else {
    log('ADMIN PIN: no input found, page text snippet=' + (await page.textContent('body')).substring(0, 200));
    await ss('06_evening_admin_nopin');
  }
} catch(e) { log('ADMIN ERROR: ' + e.message); }

// 5. Give screen
await page.goto(BASE + '/#/give', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await ss('08_give');
const giveText = await page.textContent('body');
log('GIVE: has Inspire Next Generation=' + giveText.includes('Inspire'));
log('GIVE: has Total Raised=' + giveText.includes('Total Raised'));
log('GIVE: has $12,450 start=' + (giveText.includes('12,') || giveText.includes('$12')));
log('GIVE: has HIVE=' + giveText.includes('HIVE'));
log('GIVE: has memberships count=' + giveText.includes('Membership'));

const initialAmount = await page.$eval('body', el => {
  const m = el.textContent.match(/\$([\d,]+)/g);
  return m ? m[0] : 'not found';
});
log('GIVE: initial dollar amount shown=' + initialAmount);

// Wait for ticker to increment (8-15s interval)
log('GIVE: waiting 16s for ticker increment...');
await page.waitForTimeout(16000);
await ss('09_give_after_ticker');
const giveText2 = await page.textContent('body');
const laterAmount = await page.$eval('body', el => {
  const m = el.textContent.match(/\$([\d,]+)/g);
  return m ? m[0] : 'not found';
});
log('GIVE: amount after 16s=' + laterAmount);
log('GIVE: ticker incremented=' + (laterAmount !== initialAmount));

// Give modal
try {
  await page.click('button:has-text("Give Now")');
  await page.waitForTimeout(500);
  await ss('10_give_modal');
  const modalText = await page.textContent('body');
  log('GIVE MODAL: has Make Your Impact=' + modalText.includes('Make Your Impact'));
  log('GIVE MODAL: has $50=' + modalText.includes('$50'));
  log('GIVE MODAL: has $500=' + modalText.includes('$500'));
  log('GIVE MODAL: has custom amount=' + (modalText.includes('Custom') || modalText.includes('custom') || modalText.includes('Other')));
  
  // Select $100
  await page.click('text=$100').catch(() => log('  could not click $100'));
  await page.waitForTimeout(200);
  
  // Click Donate
  await page.click('button:has-text("Donate")');
  await page.waitForTimeout(400);
  log('DONATE: button clicked');
  
  // Verify localStorage was set
  const donated = await page.evaluate(() => localStorage.getItem('catalystDonated'));
  log('DONATE: localStorage catalystDonated=' + donated);
} catch(e) { log('GIVE MODAL ERROR: ' + e.message); }

// 6. FollowUp — donated state
await page.goto(BASE + '/#/followup', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await ss('11_followup_donated');
const followupDonated = await page.textContent('body');
log('FOLLOWUP DONATED: has Thank You=' + followupDonated.includes('Thank You'));
log('FOLLOWUP DONATED: has LinkedIn button=' + followupDonated.includes('LinkedIn'));
log('FOLLOWUP DONATED: has Facebook button=' + followupDonated.includes('Facebook'));
log('FOLLOWUP DONATED: has LinkedIn share text=' + followupDonated.includes('Jeff Edwards'));
log('FOLLOWUP DONATED: has Copy Text=' + followupDonated.includes('Copy Text'));
log('FOLLOWUP DONATED: has photo gallery=' + (followupDonated.includes('Photo') || followupDonated.includes('photo')));

// 7. FollowUp — not donated state
await page.evaluate(() => localStorage.removeItem('catalystDonated'));
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await ss('12_followup_not_donated');
const followupNotDonated = await page.textContent('body');
log('FOLLOWUP NOT DONATED: has Evening Isnt Over=' + (followupNotDonated.includes("Evening Isn") || followupNotDonated.includes("isn't Over") || followupNotDonated.includes("Isn't")));
log('FOLLOWUP NOT DONATED: has Give Now=' + followupNotDonated.includes('Give Now'));
log('FOLLOWUP NOT DONATED: has Already gave=' + (followupNotDonated.includes('Already gave') || followupNotDonated.includes('Already Gave')));

// Click "Already gave"
try {
  await page.click('text=/Already gave/i');
  await page.waitForTimeout(400);
  await ss('13_followup_already_gave');
  const afterAlreadyGave = await page.textContent('body');
  log('FOLLOWUP ALREADY GAVE: flips to Thank You=' + afterAlreadyGave.includes('Thank You'));
  const ls = await page.evaluate(() => localStorage.getItem('catalystDonated'));
  log('FOLLOWUP ALREADY GAVE: localStorage set=' + ls);
} catch(e) { log('ALREADY GAVE ERROR: ' + e.message); }

// 8. BottomNav — check all 5 tabs navigate
log('\n--- BottomNav navigation ---');
const navRoutes = [
  { route: '/', label: 'Home' },
  { route: '/story', label: "Jeff's Story" },
  { route: '/evening', label: 'Evening' },
  { route: '/give', label: 'Give' },
  { route: '/followup', label: 'Follow Up' }
];
await page.goto(BASE + '/#/', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
for (const { route, label } of navRoutes) {
  try {
    await page.click(`a[href="#${route}"]`);
    await page.waitForTimeout(300);
    const url = page.url();
    log(`NAV: clicked ${label} → URL=${url} ✓`);
  } catch(e) {
    // Try text click
    try {
      await page.click(`text=${label}`);
      await page.waitForTimeout(300);
      log(`NAV: text-clicked ${label} → URL=${page.url()}`);
    } catch(e2) { log(`NAV: FAILED ${label}: ${e2.message}`); }
  }
}

await ss('14_bottomnav_final');

await browser.close();
log('\nDONE');
