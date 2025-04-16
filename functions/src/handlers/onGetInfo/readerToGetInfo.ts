import type { CookieData } from 'puppeteer';

import { useContext } from '@/core';
import { delay, logger } from '@/helpers';
import { SlackNotify, readerScreenErrorMessage, type CrawlerCallback } from '@/plugins';

import type { Integration } from './Integration';

type ReaderToGetInfoOptions = {
    integration: Integration;
    credentials?: CookieData[];
}

export default async function readerToGetInfo<T>(
    url: string,
    options: ReaderToGetInfoOptions,
    cb: () => T
): Promise<CrawlerCallback<T>> {
    return async (browser, page, { context }) => {
        const { credentials } = options;

        const { env } = useContext(context);

        // const slackNotify = use(SlackNotify);

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

        await delay(Math.floor(Math.random() * 1000) + 1000, { log: env !== 'prod' });

        return page.evaluate(cb)
            .catch((e) => {
                if (env === 'prod') {
                    // slackNotify.send(
                    //     readerScreenErrorMessage({
                    //         url: request.body.url,
                    //         message: e.message,
                    //         imageName: integration,
                    //     })
                    // );
                }

                throw new Error(e);
            })
            .finally(async () => await browser.close());
    };
}
