import { runMiddlewares } from '@/core';
import type { Middleware } from '@/core/RequestMiddleware';

export type Routes = Record<string, Middleware<unknown>[]>

export function when<T>(toMatch: string, routes: Routes): Middleware<T> {
    if (!toMatch) { throw new Error('toMatch was not defined'); }

    const entries: Array<[route: string, middleware: Middleware<T>[]]> =
        Object.entries(routes).map(([route, middleware]) => [
            route,
            middleware,
        ]);

    return (request, context, next) => {
        for (const [pathname, middlewares] of entries) {
            if (toMatch.match(pathname)) {
                return runMiddlewares(middlewares, { request, context, next });
            }
        }

        return next({ request, context });
    };
}
