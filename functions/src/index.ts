import { onRequest } from 'firebase-functions/v2/https';

import { onGetInfo } from './handlers';

export const getInfo = onRequest({ memory: '1GiB' }, onGetInfo);
