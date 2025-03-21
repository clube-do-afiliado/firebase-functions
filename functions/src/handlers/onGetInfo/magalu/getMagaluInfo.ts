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

    const match = priceEl?.textContent?.match(/(\d+,\d+)/);
    const matchOriginalPrice = priceOriginalEl?.textContent?.match(/(\d+,\d+)/);

    const price = Number(match && match[0]
        .replace(',', '.'));

    const originalPrice = Number(matchOriginalPrice && matchOriginalPrice[0]
        .replace(',', '.'));

    return {
        integration: 'magazine-luiza',
        title: title?.textContent || '',
        img: img?.getAttribute('src') || '',
        price: price || 0,
        originalPrice: originalPrice || 0,
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
