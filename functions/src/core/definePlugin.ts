import type { Context, Request } from '@/core';
import type { Plugin } from './Plugin';

export default function definePlugin<T, I>(cb: (req: Request, ctx: Context<T>) => I): Plugin<T, I> {
    return (req, ctx) => cb(req, ctx);
}
