import type { Middleware } from '@/core';
import { logger } from '@/helpers';

export function print<T>(message: Record<string, unknown>): Middleware<T> {
    return (request, context, next) => {
        logger.info(message);
        return next({ request, context });
    };
}
