export type ApiResult<T extends string | number | object> = {
    data: T;
}