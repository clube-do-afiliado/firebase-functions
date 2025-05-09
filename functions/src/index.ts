import { onRequest } from 'firebase-functions/v2/https';

import { onGetInfo, onUpdateDomain, onHealth } from './handlers';

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

export const health = onRequest(onHealth);

export const getInfo = onRequest({
    memory: '1GiB',
    timeoutSeconds: 120,
    cors: CORS_SAFE_LIST,
}, onGetInfo);

export const updateDomain = onRequest({
    cors: CORS_SAFE_LIST,
}, onUpdateDomain);
