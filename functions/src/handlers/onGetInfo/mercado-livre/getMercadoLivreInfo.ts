import { useContext } from '@/core';
import { Crawler } from '@/plugins';
import { mapCookies } from '@/helpers';
import { forward } from '@/middlewares';
import * as mercadolivreCredentials from '@/credentials/mercadolivre.json';

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
        title: (title?.textContent || '').trim(),
        img: image?.getAttribute('src') || '',
        price: price?.content || '',
    };
}

export default forward<Info>(async (_, context) => {
    const { env, use, set } = useContext(context);

    const crawlerNew = await use(Crawler);

    return crawlerNew({
        headless: env === 'prod',
    }, readerToGetInfo(
        { credentials: mapCookies(mercadolivreCredentials) },
        readerScreen
    ))
        .then((info) => {
            set((prev) => ({ ...prev, ...info }));

            return info;
        });
});
