import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './apiClient';
import { type Pokemon } from "../types";

// 1. Define Query Options (The "Queries")
export const userQueries = {
    all: () => ['users'] as const,
    list: () =>
        queryOptions({
            queryKey: [...userQueries.all(), 'list'],
            queryFn: () => api.get('/pokemon').then(res => res.data as Pokemon[]),
        }),
    detail: (id: string) =>
        queryOptions({
            queryKey: [...userQueries.all(), 'detail', id],
            queryFn: () => api.get(`/pokemon/${id}`).then(res => res.data as Pokemon),
            staleTime: 1000 * 60 * 5, // 5 mins
        }),
};

// 2. Define Custom Mutation Hooks (The "Mutations")
export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newUser: Omit<Pokemon, 'url'>) => api.post('/pokemon', newUser),
        onSuccess: async () => {
            // Like RTKQ's "invalidatesTags"
            await queryClient.invalidateQueries({ queryKey: userQueries.all() });
        },
    });
};