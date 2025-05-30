import type { Context, Middleware, Request, Response } from '@/core';

export function exec<T>(
    callback: (response: Response, request: Request, context: Context<T>) => Promise<T>
): Middleware<T> {
    return async (response, request, context, next) => {
        await callback(response, request, context);
        return next({ response, request, context });
    };
}
