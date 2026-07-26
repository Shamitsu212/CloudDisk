export async function tokenFetch(url: string, options: RequestInit = {}) {

    const token = localStorage.getItem("accessToken");

    return fetch(url, {

        ...options,

        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },

    });
}