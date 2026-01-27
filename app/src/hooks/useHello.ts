import useSWR from 'swr';
import { fetchApi } from '@/lib/api-client';

interface HelloResponse {
    message: string;
}

import type { SWRResponse } from 'swr';

export function useHello(): SWRResponse<HelloResponse, Error> {
    return useSWR<HelloResponse, Error>('/hello', fetchApi<HelloResponse>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });
}
