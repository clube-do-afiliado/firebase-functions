import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    const title = document.getElementById('title');

    const price = document.getElementById('attach-base-product-price') as HTMLInputElement;

    const imageContainer = document.getElementById('imgTagWrapperId');

    const image = imageContainer?.querySelector('img');

    return {
        title: (title?.textContent || '').trim(),
        price: (price?.value || '').trim(),
        img: image?.getAttribute('src') || '',
    };
}

export default exec<Info>(async (_, context) => {
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
