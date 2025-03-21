import { when, print, exec } from '@/middlewares';

import defineHandler from '../defineHandler';

import readerToGetCredentials from './readerToGetCredentials';

import { getAmazonInfo } from './amazon';
import { getShopeeInfo } from './shopee';
import { getMercadoLivreInfo } from './mercado-livre';
import { getMagaluInfo } from './magalu';

import { Crawler } from '@/plugins';
import { useContext } from '@/core';

// Auth
const getShopeeCredentials = exec(async (_, context) => {
    const { use } = useContext(context);

    const crawlerNew = await use(Crawler);

    return await crawlerNew({
        headless: false,
    }, readerToGetCredentials('shopee', { delay: 35000 }));
});

const getMercadoLivreCredentials = exec(async (_, context) => {
    const { use } = useContext(context);

    const crawlerNew = await use(Crawler);

    return await crawlerNew({
        headless: false,
    }, readerToGetCredentials('mercado-livre', { delay: 35000 }));
});

export default defineHandler((req) => [
    when(req.body.data.url, {
        'https://amzn.to/*': [print({ brand: 'amazon' }), getAmazonInfo],
        'https://s.shopee.com.br/*': [print({ brand: 'shopee' }), getShopeeInfo],
        'https://mercadolivre.com/*': [print({ brand: 'mercado-livre' }), getMercadoLivreInfo],
        'https://www.magazinevoce.com.br/*': [print({ brand: 'magalu' }), getMagaluInfo],
        // Auth
        'shopee.*login': [getShopeeCredentials],
        'mercadolivre.*login': [getMercadoLivreCredentials],
    }),
]);
