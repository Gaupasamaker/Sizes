const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(process.env.HOME, 'Downloads', 'Screenshots');

if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

async function run() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    const URL = 'http://localhost:5173/';

    try {
        console.log('Opening app...');
        await page.goto(URL, { waitUntil: 'networkidle2' });

        // Change language to English
        console.log('Setting language to English...');
        try {
            await page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const esBtn = buttons.find(b => b.textContent.includes('ES'));
                if (esBtn) esBtn.click();
            });
            await new Promise(r => setTimeout(r, 1000));
        } catch (e) {
            console.log('Could not find language button, continuing...');
        }

        // SEEDING DATA
        console.log('Seeding profiles...');

        const profiles = [
            { name: 'Me', type: 'man', color: 'blue', brands: [{ name: 'Nike', cat: 'shoes', size: '43' }, { name: 'Zara', cat: 'tops', size: 'L' }] },
            { name: 'Wife', type: 'woman', color: 'rose', brands: [{ name: 'Mango', cat: 'dress', size: 'M' }, { name: 'H&M', cat: 'tops', size: 'S' }] },
            { name: 'Son', type: 'child', color: 'green', brands: [{ name: 'Zara Kids', cat: 'tops', size: '8Y' }] },
            { name: 'Daughter', type: 'child', color: 'purple', brands: [{ name: 'Mayoral', cat: 'dress', size: '6Y' }] }
        ];

        for (const p of profiles) {
            console.log(`Adding profile: ${p.name}`);
            await page.waitForSelector('button.fab');
            await page.click('button.fab');
            await new Promise(r => setTimeout(r, 500));

            await page.type('input#name', p.name);

            await page.evaluate((type) => {
                const options = Array.from(document.querySelectorAll('.type-option'));
                const opt = options.find(o => o.textContent.toLowerCase().includes(type));
                if (opt) opt.click();
            }, p.type);

            await page.evaluate((color) => {
                const colors = Array.from(document.querySelectorAll('.color-option'));
                const col = colors.find(c => c.className.includes(`profile-color-${color}`));
                if (col) col.click();
            }, p.color);

            await page.click('button.btn-primary');
            await new Promise(r => setTimeout(r, 1000));

            // Navigate into profile
            await page.evaluate((name) => {
                const cards = Array.from(document.querySelectorAll('.profile-card h3'));
                const card = cards.find(h => h.textContent === name);
                if (card) card.click();
            }, p.name);
            await new Promise(r => setTimeout(r, 1000));

            for (const b of p.brands) {
                console.log(`Adding brand ${b.name} to ${p.name}`);
                await page.waitForSelector('button.fab');
                await page.click('button.fab');
                await new Promise(r => setTimeout(r, 500));
                await page.type('input#brandName', b.name);
                await page.click('button.btn-primary');
                await new Promise(r => setTimeout(r, 1200));

                await page.waitForSelector('button.fab');
                await page.click('button.fab');
                await new Promise(r => setTimeout(r, 500));

                await page.type('input[placeholder*="Size"]', b.size);
                await page.click('button.btn-primary');
                await new Promise(r => setTimeout(r, 1000));

                // Back to brands
                await page.click('.btn-ghost svg');
                await new Promise(r => setTimeout(r, 800));
            }

            // Back to profiles
            await page.evaluate(() => {
                const headerBack = document.querySelector('header .btn-ghost svg');
                if (headerBack) headerBack.closest('button').click();
            });
            await new Promise(r => setTimeout(r, 1000));
        }

        // CAPTURE
        const modes = ['Light', 'Dark'];
        for (const mode of modes) {
            console.log(`Capturing in ${mode} mode...`);

            // Go to Settings to change theme
            await page.evaluate(() => {
                const tabs = Array.from(document.querySelectorAll('.tab-item'));
                const settings = tabs.find(t => t.textContent.includes('Settings') || t.textContent.includes('Ajustes'));
                if (settings) settings.click();
            });
            await new Promise(r => setTimeout(r, 800));

            await page.evaluate((m) => {
                const buttons = Array.from(document.querySelectorAll('.theme-option'));
                const target = buttons.find(b => b.textContent.includes(m));
                if (target) target.click();
            }, mode);
            await new Promise(r => setTimeout(r, 1000));

            // Home
            await page.goto(URL);
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(DOWNLOADS_DIR, `Home_${mode}.png`) });

            // Settings
            await page.evaluate(() => {
                const tabs = Array.from(document.querySelectorAll('.tab-item'));
                const settings = tabs.find(t => t.textContent.includes('Settings') || t.textContent.includes('Ajustes'));
                if (settings) settings.click();
            });
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(DOWNLOADS_DIR, `Settings_${mode}.png`) });

            // Profile Me
            await page.goto(URL);
            await new Promise(r => setTimeout(r, 800));
            await page.evaluate(() => {
                const h3s = Array.from(document.querySelectorAll('.profile-card h3'));
                const me = h3s.find(h => h.textContent === 'Me');
                if (me) me.click();
            });
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(DOWNLOADS_DIR, `Profile_Me_${mode}.png`) });

            // Brand Nike (Me)
            await page.evaluate(() => {
                const brands = Array.from(document.querySelectorAll('.brand-name'));
                const nike = brands.find(b => b.textContent === 'Nike');
                if (nike) nike.click();
            });
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(DOWNLOADS_DIR, `Brand_Nike_${mode}.png`) });

            // Size Guide
            await page.goto(URL);
            await new Promise(r => setTimeout(r, 800));
            await page.click('.size-guide-link');
            await new Promise(r => setTimeout(r, 1000));
            await page.screenshot({ path: path.join(DOWNLOADS_DIR, `SizeGuide_${mode}.png`) });
        }

        console.log('Marketing screenshots process completed!');
    } catch (err) {
        console.error('Script failed:', err);
    } finally {
        await browser.close();
    }
}

run();
