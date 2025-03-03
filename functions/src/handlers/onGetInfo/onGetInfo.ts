import { mapCookies } from '@/helpers';
import { crawler, when } from '@/middlewares';

import defineHandler from '../defineHandler';

import type { Info } from './Info';

import readerToGetInfo from './readerToGetInfo';
import readerToGetCredentials from './readerToGetCredentials';

import { getAmazonInfo } from './amazon';
import { getShopeeInfo } from './shopee';
import { getMagazineLuizaInfo } from './magazine-luiza';

import * as shopeeCredentials from '@/credentials/shopee.json';

const getInfoShopee = crawler<Info>({
    headless: false,
}, readerToGetInfo(
    { credentials: mapCookies(shopeeCredentials) },
    getShopeeInfo
));

const getInfoMagazineLuiza = crawler<Info>({
    headless: false,
}, readerToGetInfo({}, getMagazineLuizaInfo));

const getInfoAmazon = crawler<Info>({
    headless: false,
}, readerToGetInfo({}, getAmazonInfo));

// Auth
const getCredentials = crawler({
    headless: false,
}, readerToGetCredentials('shopee', { delay: 35000 }));

export default defineHandler((req) => [
    when(req.body.url, {
        'https://amzn.to/*': [getInfoAmazon],
        'https://s.shopee.com.br/*': [getInfoShopee],
        'https://www.magazinevoce.com.br/*': [getInfoMagazineLuiza],
        // Auth
        'shopee.*login': [getCredentials],
    }),
]);
