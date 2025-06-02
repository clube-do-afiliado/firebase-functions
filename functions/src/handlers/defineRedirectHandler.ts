import createContext from '@/core/createContext';
import runMiddlewares from '@/core/runMiddlewares';
import type { Request, Response, Middleware } from '@/core';

export default function defineRedirectHandler(
    handler: (req: Request, res: Response) => Middleware<{ url: string }>[]
) {
    return async (req: Request, res: Response) => {
        try {
            const context = createContext<{ url: string }>(req);

            const middlewares = handler(req, res);

            const response = await runMiddlewares<{ url: string }>(middlewares ?? [], {
                response: res,
                request: req,
                context,
                next: async () => res,
            });

            if (!context.data.url) {
                response.status(404).json('url not found');
                return;
            }

            response.redirect(302, context.data.url);
        } catch (error) {
            res.status(500).send(error);
        }
    };
}
