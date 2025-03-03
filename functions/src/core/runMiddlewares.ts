import type { Response } from './Response';
import type { Middleware, NextFn, RunMiddlewaresOptions } from './RequestMiddleware';

export default async function runMiddlewares<T>(
    middlewares: Middleware<T>[],
    options: RunMiddlewaresOptions<T>
): Promise<Response> {
    if (middlewares.length === 0) {
        return options.next({
            context: options.context,
            request: options.request,
        });
    }

    const [current, ...remmaining] = middlewares;
    const next: NextFn<T> = ({ context, request }) =>
        runMiddlewares(remmaining, { ...options, request, context });

    return current(options.request, options.context, next);
}
