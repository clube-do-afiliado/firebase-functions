import { useContext } from '@/core';
import { Crawler } from '@/plugins';
import { forward } from '@/middlewares';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    const infoSection = document.getElementsByTagName('SECTION')[6];

    const title = document.querySelector('H1[data-testid="heading-product-title"]');
    const img = document.querySelector('img[data-testid="image-selected-thumbnail"]');
    const priceEl = infoSection.querySelector('p[data-testid="installment"]');

    return {
        title: title?.textContent || '',
        img: img?.getAttribute('src') || '',
        price: priceEl?.textContent || '',
    };
}

export default forward<Info>(async (_, context) => {
    const { env, use, set } = useContext(context);

    const crawlerNew = await use(Crawler);

    return crawlerNew({
        headless: env === 'prod',
    }, readerToGetInfo({}, readerScreen))
        .then((info) => {
            set((prev) => ({ ...prev, ...info }));

            return info;
        });
});
