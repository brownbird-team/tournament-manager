// Quick fix, this is stupid and needs to be removed !!!!!!!
export const strOnly = (entry: unknown) => {
    return typeof(entry) === 'string' ? entry : undefined;
}