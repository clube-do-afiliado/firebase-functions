import type { Plugin } from './Plugin';

export type Env = 'LOCAL' | 'STG' | 'PROD';

export type Context<T> = {
    data: Partial<T>;
    env: {
        nodeEnv: Env;
        apiKey: string;
        release: string;
        projectId: string;
        authDomain: string;
        url: {
            admin: string;
            backoffice: string;
        }
    };
    use: <I>(token: Plugin<T, I>) => I;
};
