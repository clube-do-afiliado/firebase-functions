import type { Request, Context } from '@/core';

export type Plugin<T, I> = (req: Request, ctx: Context<T>) => I;
