import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {ErrorDto} from "../dto/ErrorDto";

class ErrorUtil {

    static resolve(error: unknown): string {
        if (error) {
            if (ErrorUtil.isFetchBaseQueryError(error) && "error" in error) {
                return error.error
            } else if (ErrorUtil.isFetchBaseQueryError(error) && "data" in error) {
                return (error.data as ErrorDto).message
            } else if (ErrorUtil.isErrorWithMessage(error)) {
                return error.message
            } else {
                return JSON.stringify(error)
            }
        }
        return ""
    }

    static isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
        return typeof error === 'object' && error != null && 'status' in error
    }

    static isErrorWithMessage(error: unknown): error is { message: string } {
        return (
            typeof error === 'object' &&
            error != null &&
            'message' in error &&
            typeof (error as any).message === 'string'
        )
    }

}

export default ErrorUtil;