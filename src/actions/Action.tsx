export default interface Action<T> {
    readonly type: Symbol;
    readonly payload?: T | null;
}
