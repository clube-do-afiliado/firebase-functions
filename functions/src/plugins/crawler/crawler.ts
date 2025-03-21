import chromium from '@sparticuz/chromium';
import puppeteer, { type Browser, type Page, type LaunchOptions } from 'puppeteer-core';

import { getChromePath, getRandom } from '@/helpers';
import { definePlugin, useContext, type Context, type Env, type Request } from '@/core';

type CrawlerOptions = LaunchOptions;
export type CrawlerCallback<T> = (
    browser: Browser,
    page: Page,
    options: {
        request: Request,
        context: Context<T>
    }
) => Promise<T>;

/* eslint-disable */
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Safari/537.36 Edg/117.0.2045.43',
    'Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.88 Mobile Safari/537.36'
]
/* eslint-enable */

async function getPuppeteerArgs(env: Env): Promise<LaunchOptions> {
    return env === 'prod' ? {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
    } : {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
        ],
        executablePath: getChromePath(),
    };
}

export default definePlugin(async (request, context) => {
    return async <T>(options: CrawlerOptions, callback: Promise<CrawlerCallback<T>>) => {
        const { env } = useContext(context);

        const browser = await puppeteer.launch({
            ...options,
            ...(await getPuppeteerArgs(env)),
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            getRandom(USER_AGENTS)
        );

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US,en;q=0.8',
            'Referer': 'https://www.google.com',
        });

        await page.setViewport({ width: 1920, height: 1080 });

        const cb = await callback;

        return await cb(browser, page, { request, context });
    };
});
