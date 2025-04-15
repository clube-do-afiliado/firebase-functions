import { defineString } from 'firebase-functions/params';

export const env = defineString('env', {
    default: 'local',
    description: 'Ambiente de execução',
});
