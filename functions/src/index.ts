import { onRequest } from 'firebase-functions/v2/https';

import { onHealth, onRedirect, onGenerateShortUrl, onTrackEvent } from './handlers';

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

// const REGION = 'southamerica-east1';

export const health = onRequest(onHealth);

export const track = onRequest({
    cors: CORS_SAFE_LIST,
    // region: REGION,
}, onTrackEvent);

export const redirect = onRequest({
    cors: CORS_SAFE_LIST,
    // region: REGION,
}, onRedirect);

export const shortUrl = onRequest({
    cors: CORS_SAFE_LIST,
    // region: REGION,
}, onGenerateShortUrl);
