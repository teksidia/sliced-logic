import useSWR from 'swr';
import { fetchApi } from '@/lib/api-client';

interface HelloResponse {
    message: string;
}

export function useHello() {
    return useSWR('/hello', fetchApi<HelloResponse>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });
}
