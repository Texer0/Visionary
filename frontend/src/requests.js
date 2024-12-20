export const doRequest = async (url, method, data) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL + `/${url}`;

    const validMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    if (!validMethods.includes(method)) {
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const body = method === 'POST' || method === 'PUT' || method === 'PATCH' ? JSON.stringify(data) : undefined;

    try {
        const response = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json().catch(error => {
            throw new Error('Invalid JSON response');
        });

        return {data: responseData, status: response.status};
    } catch (error) {
        console.error(`An error occurred while requesting ${url} with method ${method}`, error);
        throw error;
    }
}
