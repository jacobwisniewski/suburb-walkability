export const isNotNullOrUndefined = <T>(value: T): value is Exclude<T, null | undefined> =>
    value !== null && value !== undefined;