import { env } from '@/env';

import { Plugin } from './Plugin';
import type { Request } from './Request';
import type { Context } from './Context';

function instantiate<T, I>(token: Plugin<T, I>, request: Request, context: Context<T>): I {
    return token(request, context);
}

export default function createContext<T>(request: Request): Context<T> {
    function use<I>(token: Plugin<T, I>): I {
        return instantiate(token, request, { use, env, data: {} });
    }

    return { data: {}, use, env };
}
