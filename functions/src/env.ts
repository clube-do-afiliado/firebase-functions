import { defineString } from 'firebase-functions/params';

export const env = defineString('ENV', {
    default: 'local',
    description: 'Ambiente de execução',
});

export const API_KEY = defineString('API_KEY', {
    default: 'api-key',
    description: 'Ambiente de execução',
});

export const PROJECT_ID = defineString('PROJECT_ID', {
    default: 'clube-do-afiliado-homolog',
    description: 'Ambiente de execução',
});

export const AUTH_DOMAIN = defineString('AUTH_DOMAIN', {
    default: 'localhost',
    description: 'Ambiente de execução',
});
