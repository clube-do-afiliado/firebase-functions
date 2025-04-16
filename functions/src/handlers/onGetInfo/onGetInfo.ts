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

    const crawler = await use(Crawler);

    return await crawler({
        headless: false,
    }, readerToGetCredentials('shopee', { delay: 35000 }));
});

const getMercadoLivreCredentials = exec(async (_, context) => {
    const { use } = useContext(context);

    const crawler = await use(Crawler);

    return await crawler({
        headless: false,
    }, readerToGetCredentials('mercado-livre', { delay: 35000 }));
});

const getMagalizeLuizaCredentials = exec(async (_, context) => {
    const { use } = useContext(context);

    const crawler = await use(Crawler);

    return await crawler({
        headless: false,
    }, readerToGetCredentials('magazine-luiza', { delay: 35000 }));
});

export default defineHandler((req) => [
    when(req.body.data.url, {
        'https://amzn.to/*': [print({ brand: 'amazon' }), getAmazonInfo],
        'https://s.shopee.com.br/*': [print({ brand: 'shopee' }), getShopeeInfo],
        'https://mercadolivre.com/*': [print({ brand: 'mercado-livre' }), getMercadoLivreInfo],
        'https://www.magazinevoce.com.br/[a-zA-Z0-9-_].*/': [print({ brand: 'magazine-luiza' }), getMagaluInfo],
        // Auth
        'shopee.*login': [
            print({ brand: 'shopee', action: 'get-credentials' }),
            getShopeeCredentials,
        ],
        'mercadolivre.*login': [
            print({ brand: 'mercadolivre', action: 'get-credentials' }),
            getMercadoLivreCredentials,
        ],
        'magazinevoce.*az-request-verify': [
            print({ brand: 'magazine-luiza', action: 'get-credentials' }),
            getMagalizeLuizaCredentials,
        ],
    }),
]);
