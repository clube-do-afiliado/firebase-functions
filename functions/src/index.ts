import { onRequest } from 'firebase-functions/v2/https';

import { onHealth, onRedirect, onGenerateShortUrl, onTrackEvent } from './handlers';

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

export const health = onRequest(onHealth);

export const track = onRequest({
    cors: CORS_SAFE_LIST,
}, onTrackEvent);

export const redirect = onRequest({
    cors: CORS_SAFE_LIST,
}, onRedirect);

export const shortUrl = onRequest({
    cors: CORS_SAFE_LIST,
}, onGenerateShortUrl);
