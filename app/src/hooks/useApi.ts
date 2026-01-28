import useSWR, { type SWRConfiguration } from 'swr';
import type { ApiError } from "@/types";

export default function useApi<T>(url: string | null, config?: SWRConfiguration) {
    // We force the Error generic to be ApiError instead of any
    return useSWR<T, ApiError>(url, config);
}