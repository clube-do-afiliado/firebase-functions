import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    const infoSection = document.getElementsByTagName('SECTION')[4];

    const title = document.querySelector('H1[data-testid="heading-product-title"]');
    const img = document.querySelector('img[data-testid="image-selected-thumbnail"]');
    const priceEl = infoSection.querySelector('p[data-testid="price-value"]');
    const priceOriginalEl = infoSection.querySelector('p[data-testid="price-original"]');

    const price = priceEl?.textContent?.replace(/[^\d,]/g, '').replace(',', '.');
    const originalPrice = priceOriginalEl?.textContent?.replace(/[^\d,]/g, '').replace(',', '.');

    return {
        integration: 'magazine-luiza',
        title: title?.textContent || '',
        img: img?.getAttribute('src') || '',
        price: Number(price) || 0,
        originalPrice: Number(originalPrice) || 0,
    };
}

export default exec<Info>(async (req, context) => {
    const { env, use, set } = useContext(context);

    const crawler = await use(Crawler);

    return crawler({
        headless: env === 'prod',
    }, readerToGetInfo(
        req.body.data.url,
        {
            integration: 'magazine-luiza',
        },
        readerScreen
    )).then((info) => {
        set((prev) => ({ ...prev, ...info }));

        return info;
    });
});
