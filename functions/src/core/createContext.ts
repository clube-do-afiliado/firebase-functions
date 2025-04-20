import { env } from '@/env';

import { Plugin } from './Plugin';
import type { Request } from './Request';
import type { Context, Env } from './Context';

function instantiate<T, I>(token: Plugin<T, I>, request: Request, context: Context<T>): I {
    return token(request, context);
}

export default function createContext<T>(request: Request): Context<T> {
    const _env = env.value() as Env;

    function use<I>(token: Plugin<T, I>): I {
        return instantiate(token, request, { use, env: _env, data: {} });
    }

    return { data: {}, use, env: _env };
}
