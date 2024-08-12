export interface ConfigIntreface<T> {
    get: <U extends keyof T>(key: U) => T[U];
}
