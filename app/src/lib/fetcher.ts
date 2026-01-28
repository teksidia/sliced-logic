const fetcher = async <T = unknown,>(
    url: string,
    init?: RequestInit,
): Promise<T> => {
    const res = await fetch(url, {
        credentials: "include",
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
        },
    });
    if (!res.ok) {
        throw new Error("An error occurred while fetching the data.");
    }
    return res.json() as Promise<T>;
};

export default fetcher;