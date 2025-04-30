import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

async function readerScreen(): Promise<Info> {
    const title = document.getElementById('title');

    const priceEl = document.getElementById('attach-base-product-price') as HTMLInputElement;

    const imageContainer = document.getElementById('imgTagWrapperId');

    const image = imageContainer?.querySelector('img');

    const price = Number(priceEl?.value.trim());

    return {
        integration: 'amazon',
        title: (title?.textContent || '').trim(),
        price: price || 0,
        img: image?.getAttribute('src') || '',
        originalPrice: 0,
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
            integration: 'amazon',
            applicant: req.body.data.applicant,
        },
        readerScreen
    )).then((info) => {
        set((prev) => ({ ...prev, ...info }));

        return info;
    });
});
