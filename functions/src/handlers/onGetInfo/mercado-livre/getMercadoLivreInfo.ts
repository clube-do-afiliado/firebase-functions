import { exec } from '@/middlewares';
import { Crawler } from '@/plugins';
import { useContext } from '@/core';
import { mapCookies } from '@/helpers';
import * as mercadolivreCredentials from '@/credentials/mercado-livre.json';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    const mainContainer = document.getElementById('ui-pdp-main-container');

    const productContainer = mainContainer?.querySelector('div > div > div');

    const rowContainer = productContainer?.getElementsByClassName('ui-pdp-container__row')[1];

    const image = rowContainer?.querySelector('figure > img');

    const title = rowContainer?.querySelector('H1');

    const price = rowContainer?.querySelector('[itemprop=\'price\']') as HTMLMetaElement;

    return {
        integration: 'mercado-livre',
        title: (title?.textContent || '').trim(),
        img: image?.getAttribute('src') || '',
        price: Number(price?.content) || 0,
        originalPrice: 0,
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
            integration: 'mercado-livre',
            credentials: mapCookies(mercadolivreCredentials),
        },
        readerScreen
    )).then((info) => {
        set((prev) => ({ ...prev, ...info }));

        return info;
    });
});
