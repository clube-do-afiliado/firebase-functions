import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';

import onHealth from './handlers/onHealth';
import onGoToApp from './handlers/onGoToApp';
import onRedirect from './handlers/onRedirect';
import onTrackEvent from './handlers/onTrackEvent';
import onGenerateShortUrl from './handlers/onGenerateShortUrl';

const CORS_SAFE_LIST = [
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*clubedoafiliado\.com(\/|$)/,
];

setGlobalOptions({ region: 'southamerica-east1' });

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

export const goToApp = onRequest({
    cors: CORS_SAFE_LIST,
}, onGoToApp);
