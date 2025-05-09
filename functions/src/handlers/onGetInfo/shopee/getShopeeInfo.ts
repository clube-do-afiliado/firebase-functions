import type { Page } from 'puppeteer';

import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';
import { mapCookies, sanitizeCurrency } from '@/helpers';
import * as shopeeCredentials from '@/credentials/shopee.json';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

async function readerScreen(page: Page): Promise<Info> {
    const main = await page.$('[role="main"]');

    if (!main) { throw new Error('main is not defined'); }

    const sections = await main.$$('section');

    if (sections.length < 3) { throw new Error('Esperado pelo menos 3 sections'); }

    const images = sections[1];
    const infos = sections[2];

    const titleEl = await infos.$('h1');
    const title = titleEl ? await page.evaluate((el) => el.textContent, titleEl) : '';

    const pricesSectionEl = await infos.$('[aria-live="polite"] > div');

    if (!pricesSectionEl) { throw new Error('pricesSectionEl is not defined'); }

    const priceDivs = await pricesSectionEl.$$('div');
    const price = priceDivs[0] ? await page.evaluate((el) => el.textContent, priceDivs[0]) : '';
    const originalPrice = priceDivs[1] ? await page.evaluate((el) => el.textContent, priceDivs[1]) : '';

    const imageEl = await images.$('div > div > div > picture > img');
    const image = imageEl ? await page.evaluate((el) => el.getAttribute('src'), imageEl) : '';

    return {
        title: title || '',
        integration: 'shopee',
        img: image || '',
        price: price ? sanitizeCurrency(price.split('-')[0]) : 0,
        originalPrice: originalPrice ? sanitizeCurrency(originalPrice.split('-')[0]) : 0,
    };
}

export default exec<Info>(async (req, context) => {
    const { env, use, set } = useContext(context);

    const crawler = await use(Crawler);

    return crawler({
        headless: env.nodeEnv === 'prod',
    }, readerToGetInfo(
        req.body.data.url,
        {
            integration: 'shopee',
            applicant: req.body.data.applicant,
            credentials: mapCookies(shopeeCredentials),
        },
        readerScreen
    )).then((info) => {
        set((prev) => ({ ...prev, ...info }));

        return info;
    });
});
