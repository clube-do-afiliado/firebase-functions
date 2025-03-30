
import dotenv from 'dotenv';

import { onRequest } from 'firebase-functions/v2/https';

import { onGetInfo } from './handlers';

dotenv.config();

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

export const getInfo = onRequest({
    memory: '2GiB',
    cors: CORS_SAFE_LIST,
}, onGetInfo);
