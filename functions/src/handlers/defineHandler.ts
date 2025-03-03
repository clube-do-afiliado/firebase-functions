import makeContext from '@/core/makeContext';
import runMiddlewares from '@/core/runMiddlewares';
import type { Request, Response, Middleware } from '@/core';

export default function defineHandler<T>(handler: (req: Request, res: Response) => Middleware<T>[]) {
    return async (req: Request, res: Response) => {
        const context = makeContext();

        const middlewares = handler(req, res);

        const response = await runMiddlewares(middlewares ?? [], {
            request: req,
            context,
            next: async () => res,
        });

        response.json(context.data);
    };
}
