export type ArrayOrObject<T> = T extends Array<infer U> ? U : T;
