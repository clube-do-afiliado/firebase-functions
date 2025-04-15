import { defineString } from 'firebase-functions/params';

export const env = defineString('ENV', {
    default: 'local',
    description: 'Ambiente de execução',
});
