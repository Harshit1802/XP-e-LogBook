export interface Result<T>{
    status: ResultStatus,
    msg?: string,
    data?: T
}

export interface ResultStatus {
    code?: number,
    msg?: string
}