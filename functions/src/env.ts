import { defineString } from 'firebase-functions/params';

import type { Env } from './core';

export const env = defineString('ENV', {
    default: 'local',
    description: 'Ambiente de execução',
}).value() as Env;
