import { defineString } from 'firebase-functions/params';

export const env = defineString('ENV', {
    default: 'LOCAL',
    description: 'Ambiente de execução',
});

export const RELEASE = defineString('RELEASE', {
    default: '0.0.0',
    description: 'Versão da projeto',
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

export const BACKOFFICE_URL = defineString('BACKOFFICE_URL', {
    default: 'http://localhost:3003',
    description: 'Url do backoffice',
});

export const ADMIN_URL = defineString('ADMIN_URL', {
    default: 'http://localhost:3001',
    description: 'Url do admin',
});
