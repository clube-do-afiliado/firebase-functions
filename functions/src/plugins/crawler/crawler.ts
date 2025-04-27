import chromium from '@sparticuz/chromium';

import type { Browser, Page } from 'puppeteer';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra, { VanillaPuppeteer } from 'puppeteer-extra';

import { getChromePath, getRandomDesktopUserAgent } from '@/helpers';
import { definePlugin, useContext, type Context, type Env, type Request } from '@/core';

puppeteerExtra.use(stealthPlugin());

type LaunchOptions = Parameters<VanillaPuppeteer['launch']>[number];
export type CrawlerCallback<T> = (
    browser: Browser,
    page: Page,
    options: {
        request: Request,
        context: Context<T>
    }
) => Promise<T>;

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
    return async <T>(options: LaunchOptions, callback: Promise<CrawlerCallback<T>>) => {
        const { env } = useContext(context);

        const browser = await puppeteerExtra.launch({
            ...options,
            ...(await getPuppeteerArgs(env)),
        });

        const page = await browser.newPage();

        // Define um user-agent fake
        await page.setUserAgent(
            getRandomDesktopUserAgent()
        );

        // Evita detecção de Webdriver
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US,en;q=0.8',
            'Referer': 'https://www.google.com',
        });

        await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

        const cb = await callback;

        return await cb(browser, page, { request, context });
    };
});
