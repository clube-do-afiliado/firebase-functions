import type { Page, CookieData } from 'puppeteer';

import { useContext } from '@/core';
import { type CrawlerCallback } from '@/plugins';
import { delay, logger, generateScreenShotPath, getFormatDate } from '@/helpers';

import type { Integration } from './Integration';

type ReaderToGetInfoOptions = {
    applicant: string;
    integration: Integration;
    credentials?: CookieData[];
}

export default async function readerToGetInfo<T>(
    url: string,
    options: ReaderToGetInfoOptions,
    cb: (page: Page) => Promise<T>,
): Promise<CrawlerCallback<T>> {
    return async (browser, page, { context }) => {
        const { credentials, applicant } = options;

        const { env } = useContext(context);

        if (credentials) {
            logger.info('Arquivo de cookies carregado');
            await browser.setCookie(...credentials);
        } else {
            logger.info('Arquivo de cookies não encontrado.');
        }

        if (!url) { throw new Error('url was not defined'); }

        await page.goto(url, { waitUntil: 'networkidle2' });

        const pageTitle = await page.title();

        logger.info('Página acessada >>>> ', pageTitle);

        await delay(Math.floor(Math.random() * 1000) + 2500, { log: env !== 'prod' });

        return cb(page)
            .then((data) => data)
            .catch(async (e) => {
                const path = generateScreenShotPath(`${applicant}-${getFormatDate(new Date())}.png`);

                await page.screenshot({ path });

                throw e;
            })
            .finally(async () => await browser.close());
    };
}
