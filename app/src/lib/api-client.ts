export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const { headers, ...restOptions } = options ?? {};
    const response = await fetch(`/api${endpoint}`, {
        credentials: 'include', // Important: sends cookies for authentication
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(
                headers instanceof Headers
                    ? Object.fromEntries(headers.entries())
                    : (headers && typeof headers === 'object' && !Array.isArray(headers))
                        ? headers
                        : {}
            ),
        },
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
    }

    return (await response.json()) as T;
}
