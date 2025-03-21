
import dotenv from 'dotenv';

import { onRequest } from 'firebase-functions/v2/https';

import { onGetInfo, onWebhookPayments } from './handlers';


dotenv.config();

export const getInfo = onRequest({ memory: '2GiB', cors: true }, onGetInfo);
export const webhookPayment = onRequest({ memory: '128MiB' }, onWebhookPayments);
