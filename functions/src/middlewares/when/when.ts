import { Request, Context, runMiddlewares } from '@/core';
import type { Middleware } from '@/core/RequestMiddleware';

export type Routes = Record<string, Middleware<unknown>[]>

type Callback<T> = (data: { request: Request, context: Context<T> }) => string | undefined;

export function when<T>(fn: Callback<T>, routes: Routes): Middleware<T> {
    const entries: Array<[route: string, middlewares: Middleware<T>[]]> =
        Object.entries(routes).map(([route, middlewares]) => [
            route,
            middlewares,
        ]);

    return (request, context, next) => {
        const toMatch = fn({ request, context });

        if (!toMatch) { throw new Error('toMatch was not defined'); }

        for (const [pathname, middlewares] of entries) {
            if (toMatch.match(pathname)) {
                return runMiddlewares(middlewares, { request, context, next });
            }
        }

        return next({ request, context });
    };
}
