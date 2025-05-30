import type { Plugin } from './Plugin';

export type Env = 'LOCAL' | 'HMG' | 'PROD';

export type Context<T> = {
    data: Partial<T>;
    env: {
        nodeEnv: Env;
        apiKey: string;
        projectId: string;
        authDomain: string;
    };
    use: <I>(token: Plugin<T, I>) => I;
};
