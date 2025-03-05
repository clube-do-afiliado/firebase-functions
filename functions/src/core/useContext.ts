
import type { Context } from './Context';

export default function useContext<T>(ctx: Context<T>) {
    function set(cb: (prev: Context<T>['data']) => Context<T>['data']) {
        ctx.data = cb(ctx.data);
    }

    return { set, ...ctx };
}
