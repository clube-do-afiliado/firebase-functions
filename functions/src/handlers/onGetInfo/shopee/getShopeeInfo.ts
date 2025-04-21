import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';
import { mapCookies } from '@/helpers';
import * as shopeeCredentials from '@/credentials/shopee.json';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    function sanitizeCurrency(value: string) {
        return Number(value.split('R$')[1]
            .replace('.', '')
            .replace(',', '.'));
    }

    const main = document.querySelector('[role="main"]');

    if (!main) { throw new Error('main is not defined'); }

    const [, images, infos] = main.getElementsByTagName('SECTION');

    const title = infos.querySelector('h1');

    const pricesSectionEl = infos.querySelector('[aria-live="polite"] > div');

    if (!pricesSectionEl) { throw new Error('pricesSectionEl is not defined'); }

    const [priceEl, originalPriceEl] = pricesSectionEl.getElementsByTagName('div');

    const price = priceEl && priceEl.textContent;
    const originalPrice = originalPriceEl && originalPriceEl.textContent;

    const image = images.querySelector('div > div > div > picture > img');

    return {
        integration: 'shopee',
        title: title?.textContent || '',
        img: image?.getAttribute('src') || '',
        price: price ? sanitizeCurrency(price.split('-')[0]) : 0,
        originalPrice: originalPrice ? sanitizeCurrency(originalPrice.split('-')[0]) : 0,
    };
}

export default exec<Info>(async (req, context) => {
    const { env, use, set } = useContext(context);

    const crawlerNew = await use(Crawler);

    return crawlerNew({
        headless: env === 'prod',
    }, readerToGetInfo(
        req.body.data.url,
        {
            integration: 'shopee',
            credentials: mapCookies(shopeeCredentials),
        },
        readerScreen
    )).then((info) => {
        set((prev) => ({ ...prev, ...info }));

        return info;
    });
});
