export type MaybePromise<T> = T | Promise<T>;
export type StringKeys<T> = Extract<keyof T, string>;