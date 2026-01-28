import useApi from "@/hooks/useApi";
import type { Hello, ApiError } from "@/types";
import type { SWRResponse } from 'swr';

function useGetHelloQuery(): SWRResponse<Hello, ApiError> {
    return useApi<Hello>("/api/hello");
}

export {
    useGetHelloQuery
};