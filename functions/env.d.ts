declare namespace NodeJS {
    export interface ProcessEnv {
        ENV: 'local' | 'prod';
        STRIPE_WEBHOOK_SECRET: string,
    }
}
