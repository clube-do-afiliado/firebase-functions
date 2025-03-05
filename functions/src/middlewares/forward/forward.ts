import type { Context, Middleware, Request } from '@/core';

export function forward<T>(
    callback: (request: Request, context: Context<T>) => Promise<T>
): Middleware<T> {
    return async (request, context, next) => {
        await callback(request, context);
        return next({ request, context });
    };
}
