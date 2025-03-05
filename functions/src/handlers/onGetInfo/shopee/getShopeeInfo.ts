import { useContext } from '@/core';
import { Crawler } from '@/plugins';
import { mapCookies } from '@/helpers';
import { forward } from '@/middlewares';
import * as shopeeCredentials from '@/credentials/shopee.json';

import type { Info } from '../Info';
import readerToGetInfo from '../readerToGetInfo';

function readerScreen(): Info {
    const productBriefing = document.getElementsByClassName('product-briefing')[0];

    const [images, infos] = productBriefing.getElementsByTagName('SECTION') as unknown as HTMLElement[];

    const title = infos.querySelector('div > div > span');

    const price = infos.querySelector('div > div > section > div > .items-center > div');

    const image = images.querySelector('div > div > div > picture > img');

    return {
        title: title?.textContent || '',
        img: image?.getAttribute('src') || '',
        price: price?.textContent || '',
    };
}

export default forward<Info>(async (_, context) => {
    const { env, use, set } = useContext(context);

    const crawlerNew = await use(Crawler);

    return crawlerNew({
        headless: env === 'prod',
    }, readerToGetInfo(
        { credentials: mapCookies(shopeeCredentials) },
        readerScreen
    ))
        .then((info) => {
            set((prev) => ({ ...prev, ...info }));

            return info;
        });
});
