import fs from 'fs';
import path from 'path';

import { delay, logger } from '@/helpers';
import type { CrawlerCallback } from '@/plugins';

import type { Integration } from './Integration';

type ReaderScreenToGetInfoOptions = {
    delay: number;
}

type Result = { status: string; }

export default async function readerToGetCredentials(
    integration: Integration,
    options: ReaderScreenToGetInfoOptions
): Promise<CrawlerCallback<Result>> {
    return async (browser, page, { request }) => {
        const url = request.body.data.url;

        if (!url) { throw new Error('url was not defined'); }

        await page.goto(url, { waitUntil: 'networkidle2' });

        await delay(options.delay, { log: true });

        const folderPath = path.resolve(__dirname, '../../credentials');
        const filePath = path.join(folderPath, `${integration}.json`);

        if (!fs.existsSync(folderPath)) {
            logger.debug('Criando pasta de credenciais...');
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const cookies = await browser.cookies();

        fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2), 'utf8');

        await browser.close();

        return {
            status: 'ok',
        };
    };
}
