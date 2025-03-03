import type { Context } from './Context';

export default function makeContext<T>(): Context<T> {
    return { data: {} };
}
