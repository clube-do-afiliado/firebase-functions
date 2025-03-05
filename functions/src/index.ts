
import dotenv from 'dotenv';

import { onRequest } from 'firebase-functions/v2/https';

import { onGetInfo } from './handlers';

dotenv.config();

export const getInfo = onRequest({ memory: '8GiB' }, onGetInfo);
