import { mapCookies } from '@/helpers';
import { crawler, when, print } from '@/middlewares';

import defineHandler from '../defineHandler';

import type { Info } from './Info';

import readerToGetInfo from './readerToGetInfo';
import readerToGetCredentials from './readerToGetCredentials';

import { getAmazonInfo } from './amazon';
import { getShopeeInfo } from './shopee';
import { getMercadoLivreInfo } from './mercado-livre';
import { getMagazineLuizaInfo } from './magazine-luiza';

import * as shopeeCredentials from '@/credentials/shopee.json';
import * as mercadolivreCredentials from '@/credentials/mercadolivre.json';

const getInfoShopee = crawler<Info>({
    headless: true,
}, readerToGetInfo(
    { credentials: mapCookies(shopeeCredentials) },
    getShopeeInfo
));

const getInfoMagazineLuiza = crawler<Info>({
    headless: true,
}, readerToGetInfo({}, getMagazineLuizaInfo));

const getInfoAmazon = crawler<Info>({
    headless: true,
}, readerToGetInfo({}, getAmazonInfo));

const getInfoMercadoLivre = crawler<Info>({
    headless: true,
}, readerToGetInfo(
    { credentials: mapCookies(mercadolivreCredentials) },
    getMercadoLivreInfo
));

// Auth
const getShopeeCredentials = crawler({
    headless: false,
}, readerToGetCredentials('shopee', { delay: 35000 }));

const getMercadoLivreCredentials = crawler({
    headless: false,
}, readerToGetCredentials('mercadolivre', { delay: 35000 }));

export default defineHandler((req) => [
    when(req.body.url, {
        'https://amzn.to/*': [getInfoAmazon],
        'https://s.shopee.com.br/*': [getInfoShopee],
        'https://www.magazinevoce.com.br/*': [getInfoMagazineLuiza],
        'https://mercadolivre.com/*': [print({ 'aqui': '' }), getInfoMercadoLivre],
        // Auth
        'shopee.*login': [getShopeeCredentials],
        'mercadolivre.*login': [getMercadoLivreCredentials],
    }),
]);
