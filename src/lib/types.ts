export type MaybePromise<T> = T | Promise<T>;
export type StringKeys<T> = Extract<keyof T, string>;
export interface UserData {
    username: string;
    desc: string;
    profilePic: string;
    linkedServices: string[];
    organizations: string[];
    tournaments: string[];
}

