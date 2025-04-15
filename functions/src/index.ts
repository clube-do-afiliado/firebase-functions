import { onRequest } from 'firebase-functions/v2/https';

import { env } from './env';
import { onGetInfo } from './handlers';

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

export const health = onRequest((_, res) => {
    res.status(200).send(`This app is healthy - ${env.value()}`);
});

export const getInfo = onRequest({
    memory: '2GiB',
    cors: CORS_SAFE_LIST,
}, onGetInfo);
