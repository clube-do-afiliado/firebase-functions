import type { CookieData } from 'puppeteer';

import { delay, logger } from '@/helpers';
import type { CrawlerCallback } from '@/middlewares';

type ReaderToGetInfoOptions = {
    credentials?: CookieData[]
}

export default async function readerToGetInfo<T>(
    options: ReaderToGetInfoOptions,
    cb: () => T
): Promise<CrawlerCallback<T>> {
    return async (browser, page, { request }) => {
        const url = request.body.url;

        const { credentials } = options;

        if (credentials) {
            await browser.setCookie(...credentials);
        } else {
            logger.info('Arquivo de cookies não encontrado.');
        }

        if (!url) { throw new Error('url was not defined'); }

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });

        await page.goto(url, { waitUntil: 'networkidle2' });

        await delay(Math.floor(Math.random() * 5000) + 3000);

        return page.evaluate(cb)
            // .catch((e) => sendErrorMessage(this.url, e.message))
            .finally(async () => await browser.close());
    };
}
