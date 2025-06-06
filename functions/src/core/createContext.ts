import * as process from '@/env';

import { Plugin } from './Plugin';
import type { Request } from './Request';
import type { Context, Env } from './Context';

function instantiate<T, I>(token: Plugin<T, I>, request: Request, context: Context<T>): I {
    return token(request, context);
}

export default function createContext<T>(request: Request): Context<T> {
    const data = {};

    const env: Context<T>['env'] = {
        nodeEnv: process.env.value() as Env,
        release: process.RELEASE.value(),
        apiKey: process.API_KEY.value(),
        projectId: process.PROJECT_ID.value(),
        authDomain: process.AUTH_DOMAIN.value(),
        url: {
            admin: process.ADMIN_URL.value(),
            backoffice: process.BACKOFFICE_URL.value(),
        },
    };

    function use<I>(token: Plugin<T, I>): I {
        return instantiate(token, request, { use, env, data });
    }

    return { data, use, env };
}
