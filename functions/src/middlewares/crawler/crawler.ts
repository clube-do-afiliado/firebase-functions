import chromium from '@sparticuz/chromium';
import puppeteer, { type Browser, type Page, type LaunchOptions } from 'puppeteer-core';

import type { Middleware, Request } from '@/core';
import useContext from '@/core/useContext';
import { getRandom } from '@/helpers/array';

type CrawlerOptions = LaunchOptions;
export type CrawlerCallback<T> = (
    browser: Browser,
    page: Page,
    options: {
        request: Request
    }
) => Promise<T>;

/* eslint-disable */
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Safari/537.36 Edg/117.0.2045.43',
    'Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1'
]
/* eslint-enable */

export function crawler<T>(options: CrawlerOptions, callback: Promise<CrawlerCallback<T>>): Middleware<T> {
    return async (request, context, next) => {
        const { set } = useContext(context);

        const browser = await puppeteer.launch({
            ...options,
            args: chromium.args,
            executablePath: await chromium.executablePath(),
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            getRandom(USER_AGENTS)
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US,en;q=0.8',
            'Referer': 'https://www.google.com',
        });

        await page.setViewport({ width: 1280, height: 800 });

        const cb = await callback;

        const data = await cb(browser, page, { request });

        set((prev) => ({ ...prev, ...data }));

        return next({ request, context });
    };
}
