import type { Plugin } from './Plugin';

export type Env = 'local' | 'prod';

export type Context<T> = {
    data: Partial<T>;
    env: Env;
    use: <I>(token: Plugin<T, I>) => I;
};
