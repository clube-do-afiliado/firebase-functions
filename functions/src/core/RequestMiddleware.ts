import type { Context } from './Context';
import type { Request } from './Request';
import type { Response } from './Response';

export type NextFn<T> = (data: { response: Response; request: Request; context: Context<T> }) => Promise<Response>;

export type Middleware<T> = (
    response: Response,
    request: Request,
    context: Context<T>,
    next: NextFn<T>,
) => Promise<Response> | Response;

export interface RunMiddlewaresOptions<T> {
    next: NextFn<T>;
    context: Context<T>;
    request: Request;
    response: Response;
}
